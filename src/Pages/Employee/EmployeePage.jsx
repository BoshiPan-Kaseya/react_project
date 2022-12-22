import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../Authentication/useToken";
import dateFormat from "../../Utils/DateFormat";
import Login from "../Auth/Login";

const EmployeePage = () => {
    const [token, setToken] = useToken();
    if (!token) {
        return <Login setToken={setToken} />;
    }

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const handleDelete = async (id) => {
        await fetch(
            import.meta.env.VITE_TEST_API_ENTRY +
                import.meta.env.VITE_EMPOLYEE_ENDPOINT +
                `/${id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
            }
        )
            .then((resposne_data) => resposne_data.json())
            .then((resposne_data) => {
                if (resposne_data.token) {
                    setToken(resposne_data.token);
                    console.log("Refresh token has updated");
                }
                if (resposne_data.success === 1) {
                    setData(
                        data.filter((employee) => employee.employee_id !== id)
                    );
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (employee) => {
        navigate(`edit_employee/${employee.employee_id}`, { state: employee });
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch(
                import.meta.env.VITE_TEST_API_ENTRY +
                    import.meta.env.VITE_EMPOLYEE_ENDPOINT,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: "Bearer " + token,
                    },
                }
            )
                .then((data) => data.json())
                .then((actualData) => {
                    if (actualData.success === 0) {
                        setToken(null);
                    } else {
                        setData(actualData.data);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setErr(err);
                    setLoading(false);
                    setData([]);
                    console.log(err);
                });
        };

        fetchData();
    }, []);

    return (
        <>
            {loading && <p>loading the data from server</p>}
            {err && <p>Error Happended</p>}
            {data && (
                <div
                    style={{
                        fontSize: "25px",
                        textAlign: "center",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    FIRST NAME
                                </th>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    LAST NAME
                                </th>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    DATE OF BIRTH
                                </th>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    AGE
                                </th>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    EMAIL
                                </th>
                                <th style={{ borderBottom: "1px solid #ddd" }}>
                                    SKILL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((employee) => (
                                <tr key={employee.employee_id}>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {employee.first_name}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {employee.last_name}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {dateFormat(employee.DOB)}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {employee.age}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {employee.email}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        {employee.skill_name}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "red",
                                                padding: "10px",
                                                borderRadius: "12px",
                                                border: "0px",
                                                width: "100%",
                                                height: "40px",
                                                color: "white",
                                                fontSize: "20px",
                                                fontWeight: "bolder",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                handleDelete(
                                                    employee.employee_id
                                                )
                                            }
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "1px solid #ddd",
                                        }}
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "cyan",
                                                padding: "10px",
                                                borderRadius: "12px",
                                                border: "0px",
                                                width: "100%",
                                                height: "40px",
                                                color: "white",
                                                fontSize: "20px",
                                                fontWeight: "bolder",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleEdit(employee)}
                                        >
                                            EDIT
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Link to="/add_new_employee">
                <button
                    style={{
                        backgroundColor: "cyan",
                        padding: "10px",
                        borderRadius: "12px",
                        border: "0px",
                        width: "20%",
                        height: "40px",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bolder",
                    }}
                >
                    ADD NEW EMPLOYEE
                </button>
            </Link>
        </>
    );
};

export default EmployeePage;
