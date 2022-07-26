import { User } from "../types/user.types";
import pool from "../config/db"

interface IUserStore {
    userExists: (username: string) => Promise<boolean>;
    addUser: (username:string, password:string) => Promise<User>;
    getUser: (username:string) => Promise<User | null>;
}

class UserStore implements IUserStore {
    async userExists(username:string): Promise<boolean> {
        const queryResult = await pool.query(`SELECT * FROM users WHERE username = $1`,[username]);
        return queryResult.rowCount > 0;
    };

    async addUser(username:string, password:string): Promise<User> {
        const queryResults = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING * FROM users WHERE username = $1`,[username, password]);
        const user = queryResults.rows[0];
        return user;
    };

    async getUser(username:string): Promise<User | null> {
        const queryResult = await pool.query(`SELECT * FROM users WHERE username = $1`,[username]);
        if (queryResult.rowCount) {
            return queryResult.rows[0];
        }

        return null;
    }
}

export default new UserStore as IUserStore;