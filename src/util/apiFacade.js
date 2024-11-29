const URL = "https://tripapi.cphbusinessapps.dk/api";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
}

function apiFacade() {
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    const getToken = () => {
        return localStorage.getItem('jwtToken');
    };

    const loggedIn = () => {
        return getToken() != null;
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
    };

    const getUserRoles = () => {
        const token = getToken();
        if (token != null) {
            try {
                const payloadBase64 = getToken().split('.')[1];
                const decodedClaims = JSON.parse(window.atob(payloadBase64));
                const roles = decodedClaims.roles;
                return roles;
            } catch (error) {
                console.error("Error decoding token:", error);
                return "";
            }
        } else return "";
    };

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',');
        return loggedIn && roles.includes(neededRole);
    };

    const login = async (user, password) => {
        const options = makeOptions("POST", false, { username: user, password: password });
        try {
            const response = await fetch(URL + "/auth/login", options);
            const data = await handleHttpErrors(response);
            setToken(data.token);
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const fetchData = async (endpoint, addToken = true) => {
        const options = makeOptions("GET", addToken);
        try {
            const response = await fetch(URL + endpoint, options);
            return await handleHttpErrors(response);
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const makeOptions = (method, addToken, body) => {
        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        };
        if (addToken && loggedIn()) {
            opts.headers["Authorization"] = `Bearer ${getToken()}`;
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    };

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        hasUserAccess,
        getUserRoles
    };
}

const facade = apiFacade();
export default facade;