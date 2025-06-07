# forestry-club
Hour tracking for Green River College's Forestry Club

## Specific documents

[Troubleshooting](documentation/TROUBLESHOOTING.md)

[Developer Information](documentation/DEVELOPER.md)

## Prerequisites

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
