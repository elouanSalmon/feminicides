import json
import time
import random
import os
import requests

def load_cache():
    cache_file = 'geocode_cache.json'
    if os.path.exists(cache_file):
        with open(cache_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_cache(cache):
    cache_file = 'geocode_cache.json'
    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

def get_cache_key(city, department):
    return f"{city.lower()},{department.lower()}"

def get_coordinates(city, department, cache):
    cache_key = get_cache_key(city, department)
    
    # Check cache first
    if cache_key in cache:
        print(f"Cache hit for {city}, {department}")
        return cache[cache_key]
    
    print(f"Geocoding {city}, {department}...")
    max_retries = 3
    
    for _ in range(max_retries):
        try:
            # Try with city only first (matching frontend approach)
            query = f"{city}, France"
            response = requests.get(
                f"https://nominatim.openstreetmap.org/search?format=json&q={query}",
                headers={'User-Agent': f'my_app_{random.randint(1,1000)}'}
            )
            data = response.json()
            
            if data and len(data) > 0:
                coords = {"lat": float(data[0]['lat']), "lng": float(data[0]['lon'])}
                cache[cache_key] = coords
                save_cache(cache)
                return coords
            
            # If city only fails, try with department
            query = f"{city}, {department}, France"
            response = requests.get(
                f"https://nominatim.openstreetmap.org/search?format=json&q={query}",
                headers={'User-Agent': f'my_app_{random.randint(1,1000)}'}
            )
            data = response.json()
            
            if data and len(data) > 0:
                coords = {"lat": float(data[0]['lat']), "lng": float(data[0]['lon'])}
                cache[cache_key] = coords
                save_cache(cache)
                return coords
            
            return None
        except Exception as e:
            print(f"Error during geocoding: {e}")
            time.sleep(random.uniform(1, 2))
    return None

def save_data_atomic(data):
    # Create a temporary file
    temp_file = 'data.json.tmp'
    try:
        # Write to temporary file first
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.flush()
            os.fsync(f.fileno())
        
        # Rename temporary file to target file (atomic operation)
        os.replace(temp_file, 'data.json')
    except Exception as e:
        # Clean up temporary file if something goes wrong
        if os.path.exists(temp_file):
            os.remove(temp_file)
        raise e

def main():
    # Load existing cache
    cache = load_cache()
    
    # Load data file
    try:
        with open('data.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
    except FileNotFoundError:
        print("data.json not found. Creating new file.")
        data = []
    except json.JSONDecodeError:
        print("Error reading data.json. Creating backup and starting fresh.")
        os.rename('data.json', f'data.json.backup.{int(time.time())}')
        data = []
    
    # Process entries
    for i, entry in enumerate(data):
        if 'lat' not in entry or 'lng' not in entry:
            try:
                city = entry.get('city', '')
                department = entry.get('department', '')
                
                if not city:
                    print(f"Skipping entry {i}: missing city")
                    continue
                    
                coords = get_coordinates(city, department, cache)
                if coords:
                    entry.update(coords)
                    # Save atomically after each successful geocoding
                    save_data_atomic(data)
                    print(f"Added and saved coordinates for {city} (entry {i})")
                else:
                    print(f"Could not find coordinates for {city} (entry {i})")
                time.sleep(random.uniform(1, 2))  # Reduced sleep time due to caching
            except Exception as e:
                print(f"Error processing entry {i}: {e}")
                continue
    
    print("Geocoding process completed")

if __name__ == '__main__':
    main()