interface UserJwtDecode {
    sub: string;
    roleName: string;
    iat: number;
    exp: number;
}
export type { UserJwtDecode };
