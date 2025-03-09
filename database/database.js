import mysql from 'mysql2/promise'

// TODO: I should really be in a .env file. 
async function connect_db() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'forestry_user',
        database: 'forestry_db',
        password: 'F6CraKpFjfbIo1'
    });

    if (!connection) console.error('Failed to make a connection.');

    return connection;
}
