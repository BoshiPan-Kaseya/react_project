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
                    authorization: token,
                },
            }
        )
            .then((resposne_data) => resposne_data.json())
            .then((resposne_data) => {
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
                        authorization: token,
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
                });
        };

        fetchData();
    }, []);

    return (
        <>
            {loading && <p>loading the data from server</p>}
            {err && <p>Error Happended</p>}
            {data && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>EMPLOYEE ID</th>
                                <th>FIRST NAME</th>
                                <th>LAST NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>AGE</th>
                                <th>EMAIL</th>
                                <th>SKILL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((employee) => (
                                <tr key={employee.employee_id}>
                                    <td>{employee.employee_id}</td>
                                    <td>{employee.first_name}</td>
                                    <td>{employee.last_name}</td>
                                    <td>{dateFormat(employee.DOB)}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.skill_name}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    employee.employee_id
                                                )
                                            }
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                    <td>
                                        <button
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
                <button>ADD NEW EMPLOYEE</button>
            </Link>
        </>
    );
};

export default EmployeePage;
