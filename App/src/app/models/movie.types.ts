type Genres = {
    id:number;
    name:string;
}
type Companies = {
    name: string;
    origin_country: string;
}

export type Movie = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    runtime:number;
    budget:number;
    genres: Genres[];
    revenue: number;
    production_companies: Companies[];
    isWishlisted?: boolean;
}

export type  MovieListResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
}