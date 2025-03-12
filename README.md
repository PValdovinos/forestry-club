# forestry-club
Sign in sheet for Green River College's Forestry Club

## Instructions for Docker self hosting
Run these commands to start the Docker container
- `docker-compose pull`
- `docker-compose up -d`

Change the database password in `docker-compose.yml`

## Prerequisites
Docker
- Linux - [docs.docekr.com/desktop/setup/install/linux/](docs.docker.com/desktop/setup/install/linux/)
- Mac - [docs.docker.com/desktop/setup/install/mac-install/](docs.docker.com/desktop/setup/install/mac-install/)
- Window - [docs.docker.com/desktop/setup/install/windows-install/](docs.docker.com/desktop/setup/install/window-install/)
node
- [nodejs.org/en/download](nodejs.org/en/download)
npm
- [docs.npmjs.com/downloading-and-installing-node-js-and-npm](docs.npmjs.com/downloading-and-installing-nodejs-and-npm)

## Installation
> Setup Files
>> `git clone https://github.com/GreenThumbGRC/forestry-club.git`
>> `docker compose up -d`
>> `cd forestry-club-hours-tracker`
>> `npm i`
>> `npm run server`
>> Open second terminal & navigate to current directory
>> `npm run dev`
> SQL Database Setup
>> Navigate to [localhost:8080](localhost:8080)
>> (img/Nav_To_PHPMyAdmin.png)
>> Login as root
>> (img/Log_In_As_Root.png)
>> Give permissions to forestry_user
>> (img/Navigate_To_User_Settings.png)
>> (img/Navigate_To_Forestry_User.png)
>> (img/Set_Privileges.png)
>> Add table schema
>> (img/Navigate_To_Forestry_DB.png)
>> (img/Navigate_To_Import.png)
>> (img/Choose_File.png)
>> (img/Find_File.png)
>> (img/Import_Schema.png)