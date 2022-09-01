import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: 'Popitta228!',
    port: 5432
})

export default pool