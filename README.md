# forestry-club
Sign in sheet for Green River College's Forestry Club

## Instructions for Docker self hosting
Run these commands to start the Docker container
- `docker-compose pull`
- `docker-compose up -d`

Change the database password in `docker-compose.yml`

## Prerequisites
Docker
- Linux - [docs.docker.com/desktop/setup/install/linux/](docs.docker.com/desktop/setup/install/linux/)
- Mac - [docs.docker.com/desktop/setup/install/mac-install/](docs.docker.com/desktop/setup/install/mac-install/)
- Window - [docs.docker.com/desktop/setup/install/windows-install/](docs.docker.com/desktop/setup/install/window-install/)

node - [nodejs.org/en/download](nodejs.org/en/download)

npm - [docs.npmjs.com/downloading-and-installing-node-js-and-npm](docs.npmjs.com/downloading-and-installing-nodejs-and-npm)

## Installation
> Setup Files
> - Run commands in the directory that the project will live in (in order)
>> `git clone https://github.com/GreenThumbGRC/forestry-club.git`
> 
>> `docker compose up -d`
> 
>> `cd forestry-club-hours-tracker`
> 
>> `npm i`
> 
>> `npm run server`
> 
>> Open second terminal & navigate to current directory\
>> `npm run dev`
> 
>  ### SQL Database Setup
>> #### Navigate to localhost:8080
>> ![Navigate to phpMyAdmin](img/Nav_To_PHPMyAdmin.png)
> 
>> #### Login as root
>> ![Log in as Root](img/Log_In_As_Root.png)
> 
>> #### Give permissions to forestry_user
>> ![Navigate to sser settings](img/Navigate_To_User_Settings.png)\
>> ![Navigate to forestry_user](img/Navigate_To_Forestry_User.png)\
>> ![Set privileges](img/Set_Privileges.png)
> 
>> #### Add table schema
>> ![Navigate to forestry database](img/Navigate_To_Forestry_DB.png)\
>> ![Navigate to import](img/Navigate_To_Import.png)\
>> ![Choose file](img/Choose_File.png)\
>> ![Find file](img/Find_File.png)\
>> ![Import](img/Import_Schema.png)
