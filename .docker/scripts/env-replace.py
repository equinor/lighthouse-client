#
# Creates a client-config.json based on .env file provided by Docker.
# The variables are then replaced with the current variables awaitable.
#

import json
import os

print('Start - Creating client-config.json')

# Reading the .env file.
with open('/etc/scripts/.env', 'r') as env_file:
    content = env_file.readlines()
    env_file.close()

# Extracting environment keys.
keys = [line.split('=')[0] for line in content if '=' in line]

# Get Environmet Keys
env_keys = [((key, os.environ.get(key))) for key in keys]

# Write the client-config.json file.
with open('/usr/share/nginx/html/client-config.json', "w") as config_file:
    config_file.write(json.dumps(dict(env_keys)))
    config_file.close()

print('Done - Creating client-config.json')
