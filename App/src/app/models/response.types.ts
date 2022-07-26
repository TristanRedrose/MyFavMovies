export type ApiResponse = {
    message: string;
    token?: string;
    exp?: number;
}

export type WishlistResponse = {
    movie_id: number;
}