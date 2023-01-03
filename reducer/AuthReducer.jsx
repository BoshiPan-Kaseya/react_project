const authReducer = (auth, action) => {
    switch (action.type) {
        case "signin":
            return {
                ...auth,
                token: action.token,
                isSignOut: false,
            };
        case "signout":
            return {
                ...auth,
                token: null,
                isSignOut: true,
            };
    }
};
