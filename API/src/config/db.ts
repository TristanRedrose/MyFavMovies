import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    password: "Quantum7.",
    database: "myfavmovies",
    host: "localhost",
    port: 5432,
});

export default pool;