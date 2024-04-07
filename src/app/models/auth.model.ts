export interface AuthRequest {
    nif: string;
    username: string;
    pass: string;
}

export interface AuthResponse {
    jwt: string;
}