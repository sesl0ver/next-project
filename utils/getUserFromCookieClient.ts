export function getUserFromCookieClient() {
    const cookieString = document.cookie;
    const cookies = Object.fromEntries(
        cookieString.split('; ').map(cookie => {
            const [key, ...value] = cookie.split('=');
            return [key, value.join('=')];
        })
    );

    const base64User = cookies['user-data'];

    if (!base64User) {
        return null;
    }

    try {
        const decoded = atob(base64User); // base64 decode
        return JSON.parse(decoded);
    } catch (error) {
        return null;
    }
}