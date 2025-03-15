import json

# Read the existing data
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update each entry: rename 'department' to 'age'
for entry in data:
    if 'department' in entry:
        entry['age'] = entry['department']
        del entry['department']
    else:
        print(f"Warning: Entry {entry.get('name', 'Unknown')} is missing 'department' field")

# Write the updated data back to the file
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Successfully updated data.json: renamed "department" field to "age"')