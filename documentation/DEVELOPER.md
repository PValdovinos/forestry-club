# Developer Documentation
Welcome to the Developer Docs for the Green River College 
    - Forestry Club Volunteer hour Tracker! - 

## Technology Overview

Frontend: We used JSX and JavaScript to build the user interface, 
creating intuitive views for both volunteers and administrators.

Backend: The backend of the application is powered by PHP, 
which processes form submissions, managed sessions, 
and handles data exchange between the frontend and the database. 

### TODO - Add diagram here
![View the backend diagram](../img/Backend_Diagram.png)\

### Technology list

| Front-end | Back-end | Database | Other  |
| --------- | -------- | -------- | ------ |
| React     | PHP      | MySQL    | npm    |
| MUI       |          |          | day.js |
| JSX       |          |          | Vite   |

### Technology quick-reference

[React](https://react.dev/reference/react) - Front-end Javascript library to assist in building user interfaces based on components.

[MUI](https://mui.com/material-ui/getting-started/) - Material UI is an open-source React component library. Used for tables and other site components.

[PHP](https://www.php.net/) -  Fast, flexible Back-end scripting language chosen for it's compatibility with low cost hosting platforms.

[MySQL](https://www.mysql.com/) -  An open-source relational database management system, used for storing all application data, including user information and hour logs.

[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) - The Node Package Manager for installing and managing JavaScript dependencies for both frontend and backend development.

[day.js](https://day.js.org/) - Light weight javascript library used to make date calculations easier.

[Vite](https://vite.dev/) - A modern frontend build tool that provides a lightning-fast development 

## Site setup guide
On the rare chance that developers are testing and devloping locally, please refer to [The README file](../README.md)\

Otherwise, developers will need to procure the log-in information to the Interserver account that hosts the GRC Forestry Club website,
which will be given to club leadership so they may distribute the username and password as they see fit.


### Site file setup
forestry-club
    -documentation
    -forestry-club-hour-tracker
        -public
        -src
    -img
    -scripts

### Database setup
>> #### Give permissions to forestry_user
>> ![Navigate to user settings](../img/Navigate_To_User_Settings.png)\
>> ![Navigate to forestry_user](../img/Navigate_To_Forestry_User.png)\
>> ![Set privileges](../img/Set_Privileges.png)
> 
>> #### Add table schema
>> ![Navigate to forestry database](../img/Navigate_To_Forestry_DB.png)\
>> ![Navigate to import](../img/Navigate_To_Import.png)\
>> ![Choose file](../img/Choose_File.png)\
>> ![Find file](../img/Find_File.png)\
>> ![Import](../img/Import_Schema.png)