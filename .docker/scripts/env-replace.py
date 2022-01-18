#
# Creates a client-config.json based on .env file provided by Docker.
# The variables are then replaced with the current variables awaitable.
#

import json
import os

print('Start - Creating client-config.json')

# Reading the .env file.
with open('/etc/scripts/.env', 'r') as envFile:
    content = envFile.readlines()
    envFile.close()

# Extracting environment keys.
keys = [line.split('=')[0] for line in content if '=' in line]

# Get Environmet Keys
envKeys = [((key, os.environ.get(key))) for key in keys]

# Write the client-config.json file.
with open('/usr/share/nginx/html/client-config.json', "w") as configFile:
    configFile.write(json.dumps(dict(envKeys)))
    configFile.close()

print('Done - Creating client-config.json')
