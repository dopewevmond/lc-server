#!/bin/bash
set -e

# Copy the nginx configuration file to the appropriate location
sudo cp nginx.conf /etc/nginx/conf.d/
sudo chmod 644 /etc/nginx/conf.d/nginx.conf

# Restart NGINX to apply the changes
sudo service nginx restart