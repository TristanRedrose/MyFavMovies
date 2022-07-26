import express from "express";
import { WishlistRequest } from "../../types/wishlist.types";
import { TypedRequestBody } from "../../types/shared.types";
import { verifyToken } from "../../middleware/verifyToken";
import wishlistController from "../../controllers/wishlist.controller";


const router = express.Router();

router.use(verifyToken);

router.get("/getWishlist",(req: TypedRequestBody<WishlistRequest>, res) => {
    try {
        return wishlistController.getWishlist(req.body, res)
    } catch (err) {
        console.log(err);
    }
});

router.post("/addWish", (req: TypedRequestBody<WishlistRequest>, res) => {
    try {
        return wishlistController.addWish(req.body, res);
    } catch (err) {
        console.log(err);
    }
});

router.post("/removeWish", (req: TypedRequestBody<WishlistRequest>, res) => {
    try {
        return wishlistController.removeWish(req.body, res);
    } catch (err) {
        console.log(err);
    }
});

export default router;

