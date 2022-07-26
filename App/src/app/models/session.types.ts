export type Session = {
    token: string | null;
    username: string;
    validTo: number | null;
}