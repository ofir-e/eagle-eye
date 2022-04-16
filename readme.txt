how to deploy:
    1- change url in clients to desired dns url instead of localhost
    2- run in each project npm i and npm run build
    3- set up volume for mongo in docker-compose.yml
    4- (pull from registry\load from tar) required docker images (mongo,node:14-slim,abhin4v/hastatic:latest)
    5- set admin password in docker-compose.yml
    6- run docker-compose up

requirements:
    docker
    docker-compose
    docker images(mongo,node:14-slim,abhin4v/hastatic:latest)
    volume for mongo (path in vm or network directory or whatever works for u)