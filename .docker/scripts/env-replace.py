import json
import os

print('Start - Creating client-config.json')

# Reading the .env file.
with open('/etc/scripts/.env', 'r') as f:
    content = f.readlines()

# Extracting environment keys.
keys = [line.split('=')[0] for line in content if '=' in line]

# Get Environmet Keys
envKeys = []
for key in keys:
    envKeys.append((key, os.environ.get(key)))

with open('/usr/share/nginx/html/client-config.json', "w") as file:
    file.write(json.dumps(dict(envKeys)))


print('Done - Creating client-config.json')
