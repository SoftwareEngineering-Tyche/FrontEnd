export const login = (userData) => ({
    type: "LOGIN",
    payload: {
        ethereum_address: userData,
    }
});