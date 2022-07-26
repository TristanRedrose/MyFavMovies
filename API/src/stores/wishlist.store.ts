import pool from "../config/db";
import { Wishlist } from "../types/wishlist.types"

interface IWishlistStore {
    getWishlist: (user_id:number) => Promise<Wishlist[] | null>
    wishExists: (user_id:number, movie_id:number) => Promise<boolean>
    addWish: (user_id:number, movie_id:number) => Promise<void>
    removeWish: (user_id:number, movie_id:number) => Promise<void>
}

class WishlistStore implements IWishlistStore {
    async getWishlist(user_id: number): Promise<Wishlist[] | null> {
        const queryResult = await pool.query('SELECT movie_id from wishlist WHERE user_id = $1', [user_id]);
        if (queryResult.rowCount) {
            return queryResult.rows
        } 

        return null;
    };

    async wishExists(user_id: number, movie_id: number): Promise<boolean> {
        const queryResult = await pool.query('SELECT * from wishlist WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id]);
        return queryResult.rowCount > 0;
    };

    async addWish(user_id:number, movie_id:number): Promise<void> {
        await pool.query(`INSERT INTO wishlist (user_id, movie_id) VALUES ($1, $2) RETURNING *`,[user_id, movie_id]);
    };

    async removeWish(user_id: number, movie_id: number): Promise<void> {
        await pool.query('DELETE FROM wishlist WHERE user_id = $1 AND movie_id = $2',[user_id, movie_id]);
    };
}

export default new WishlistStore as IWishlistStore;

