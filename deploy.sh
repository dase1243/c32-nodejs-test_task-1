#!/bin/sh

config_env="./config.env"

if [ ! -e "$config_env" ]; then
  echo "Configure config.env file with environment variables for app and api services"
  exit 1
fi

echo "config file exist"

source config.env

sudo docker compose down

sudo docker rm shorter_api shorter_app shorter_redis

sudo docker rmi links-shorter-shorter_app links-shorter-shorter_api redis

sudo docker compose --env-file ./config.env up --build