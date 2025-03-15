import json
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
import time
import random

def get_coordinates(city, department):
    geolocator = Nominatim(user_agent=f"my_app_{random.randint(1,1000)}")
    max_retries = 3
    for _ in range(max_retries):
        try:
            location = geolocator.geocode(f"{city}, {department}, France")
            if location:
                return {"lat": location.latitude, "lng": location.longitude}
            location = geolocator.geocode(f"{city}, France")
            if location:
                return {"lat": location.latitude, "lng": location.longitude}
            return None
        except (GeocoderTimedOut, GeocoderServiceError):
            time.sleep(random.uniform(2, 5))
    return None

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

for entry in data:
    if 'lat' not in entry or 'lng' not in entry:
        coords = get_coordinates(entry['city'], entry['department'])
        if coords:
            entry.update(coords)
            print(f"Added coordinates for {entry['city']}")
        time.sleep(random.uniform(1, 3))

with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print("Coordinates have been added to the JSON file.")