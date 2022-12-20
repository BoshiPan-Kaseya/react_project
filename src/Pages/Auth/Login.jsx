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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const data = await credentials({
            username: username,
            password: password,
        });
        setToken(data.token);
    };
    return (
        <>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
