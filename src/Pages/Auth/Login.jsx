import { useState } from "react";

const credentials = async (info) => {
    return fetch(
        import.meta.env.VITE_TEST_API_ENTRY +
            import.meta.env.VITE_LOGIN_ENDPOINT,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(info),
        }
    )
        .then((data) => data.json())
        .catch((err) => err.json());
};

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const data = await credentials({
            username: username,
            password: password,
        });
        if (data.token) {
            setToken(data.token);
            setError(false);
        } else {
            setError(true);
        }
    };
    return (
        <>
            {error && <p>somthing went wrong, try again</p>}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5%",
                        padding: "15%",
                    }}
                >
                    <form onSubmit={handleOnSubmit}>
                        <input
                            style={{
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                alignItems: "center",
                                borderRadius: "12px",
                                fontSize: "20px",
                                marginBottom: "20px",
                            }}
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            style={{
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                alignItems: "center",
                                borderRadius: "12px",
                                fontSize: "20px",
                                marginBottom: "20px",
                            }}
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            style={{
                                backgroundColor: "Cyan",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px",
                                borderRadius: "12px",
                                border: "0px",
                                width: "100%",
                                height: "40px",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bolder",
                            }}
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
        </>
    );
};

export default Login;
