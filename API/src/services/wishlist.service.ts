import wishlistStore from "../stores/wishlist.store";
import { Wishlist } from "../types/wishlist.types";

interface IWishlistService {
    getWishlist:(user_id:number) => Promise<Wishlist[] | null>
    addWish:(user_id:number, movie_id:number) => Promise<boolean>
    removeWish:(user_id:number, movie_id:number) => Promise<boolean>
}

class WishlistService implements IWishlistService {
    async getWishlist(user_id: number): Promise<Wishlist[] | null> {
        const wishlist = await wishlistStore.getWishlist(user_id);
        return wishlist;
    }

    async addWish(user_id: number, movie_id: number):Promise<boolean> {
        const wishExists = await wishlistStore.wishExists(user_id,movie_id);
        if (wishExists) {
            return false
        }

        await wishlistStore.addWish(user_id, movie_id);
        return true;
    }

    async removeWish(user_id: number, movie_id: number):Promise<boolean> {
        const wishExists = await wishlistStore.wishExists(user_id,movie_id);
        if (!wishExists) {
            return false
        }

        await wishlistStore.removeWish(user_id,movie_id);
        return true;
    }
}

export default new WishlistService as IWishlistService;

