import { connect, connection } from 'mongoose';

const conn = {
    isConnected: false
}

export async function dbConnection() {
    try {
        const dbUri = process.env.Db_Connection;
        if (!dbUri) throw new Error('The database connection string is not configured.');
        if (conn.isConnected) return;
        const db = await connect(dbUri);
        conn.isConnected = db.connections[0].readyState === 1;
        console.log(`DB ${db.connection.db.databaseName} online`);
    } catch (error) {               
        throw new Error('Error initializing DB');
    }
}

connection.on('connected', () => {
    console.log('Mongoose is connected');
})

connection.on('error', (err) => {
    console.log('Mongoose connection error', err);
})



