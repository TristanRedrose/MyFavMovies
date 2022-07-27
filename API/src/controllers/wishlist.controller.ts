import wishlistService from "../services/wishlist.service";
import { Response } from "express";
import { WishlistRequest } from "../types/wishlist.types";
import { decodeToken } from "../middleware/decodeToken";

export interface IWishlistController {
    getWishlist:(req:WishlistRequest, res:Response) => Promise<Response>
    addWish:(req:WishlistRequest, res:Response) => Promise<Response>
    removeWish:(req:WishlistRequest, res:Response) => Promise<Response>
}

class WishlistController implements IWishlistController {
    async getWishlist(req: WishlistRequest, res: Response): Promise<Response> {
        const user_id = decodeToken(req.token);
        const wishlist = await wishlistService.getWishlist(user_id);
        return res.json(wishlist)
    }

    async addWish(req: WishlistRequest, res: Response): Promise<Response> {
        const user_id = decodeToken(req.token);
        const wishAdded = await wishlistService.addWish(user_id, req.movie_id);
        if (wishAdded) {
            return res.status(200).json({message: 'Movie added to wishlist'});
        }

        return res.status(400).json({message: 'Movie already on wishlist'});
    }

    async removeWish(req: WishlistRequest, res: Response): Promise<Response> {
        const user_id = decodeToken(req.token);
        const wishRemoved = await wishlistService.removeWish(user_id, req.movie_id);
        if (wishRemoved) {
            return res.status(200).json({message: 'Movie removed from wishlist'});
        }

        return res.status(400).json({message: 'Movie not found'});
    }
}

export default new WishlistController as IWishlistController;