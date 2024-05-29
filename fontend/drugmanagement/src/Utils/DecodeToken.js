export const DecodeToken = (token) => {
    try {
        const parts = token.split('.');
        const decodeTokenPayload = JSON.parse(atob(parts[1]));
        return {
            aud: decodeTokenPayload.aud,
            exp: decodeTokenPayload.exp,
            role: decodeTokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            username: decodeTokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            iss: decodeTokenPayload.iss
        };
    }
    catch (error) {
        return null;
    }
}