export type Wishlist = {
    user_id: number;
    movie_id: number;
}

export type WishlistRequest = {
    token: string,
    movie_id: number,
}