import express from "express";
import authRoutes from "./auth/auth.routes";
import wishlistRoutes from "./wishlist/wishlist.routes"

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/wishlist", wishlistRoutes);

export default router;