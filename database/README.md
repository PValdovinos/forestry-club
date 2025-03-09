# Purpose

I am a simple database connection file. I can be included in any project by simply copying me.

## Usage

- Install 'mysql2' into your node packages
- Include 'database.js' into your files
- call "connect_db()" and store its result in a file. You should now have a functioning database object.

## Troubleshooting

- No connection?
  - Make sure that your database is running.
  - make sure that your filewall allows connections to its port!
  - If this is self hosted (i.e., Docker) you should be connecting to localhost.
