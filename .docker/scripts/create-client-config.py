import json

print('Start - Creating client-config.json')

# Reading the .env file.
with open('.env', 'r') as f:
    content = f.readlines()

# Extracting environment keys.
content = [line.strip().split('=') for line in content if '=' in line]

with open('./src/client-config.json', "w") as file:
    file.write(json.dumps(dict(content)))


print('Done - Creating client-config.json')
