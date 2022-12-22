import { useEffect, useState } from "react";
import useToken from "../../Authentication/useToken";
import Login from "../Auth/Login";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import dateFormat from "../../Utils/DateFormat";
import { Navigate } from "react-router-dom";

const AddEmployee = () => {
    const [token, setToken] = useToken();

    if (!token) {
        setToken(null);
        return <Login setToken={setToken} />;
    }

    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();

    const [added, setAdded] = useState(false);
    //TODO: refactor to useReducer or Reducer and context
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState(new Date());
    const [email, setEmail] = useState("");
    const [skill, setSkill] = useState("");
    const [active, setActive] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_employee = {
            first_name: firstName,
            last_name: lastName,
            DOB: dateFormat(DOB),
            email: email,
            skill_level: skill,
            active: active,
            age: new Date().getFullYear() - DOB.getFullYear(),
        };
        addNewEmployee(new_employee);
    };

    //TODO: figure out what does JSON.stringify do, why we need that
    const addNewEmployee = async (data) => {
        await fetch(
            import.meta.env.VITE_TEST_API_ENTRY +
                import.meta.env.VITE_EMPOLYEE_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((data) => data.json())
            .then((data) => {
                if (data.success === 0) {
                    setErr("Failed to add new data to database");
                } else {
                    setAdded(true);
                }
            });
    };

    useEffect(() => {
        const fetchSkill = async () => {
            await fetch(
                import.meta.env.VITE_TEST_API_ENTRY +
                    import.meta.env.VITE_SKILL_ENDPOINT,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        authorization: "Bearer " + token,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.success === 0) {
                        setToken(null);
                        setLoading(false);
                    }
                    setSkillList(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setErr(err);
                    setLoading(false);
                });
        };
        fetchSkill();
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid grey",
                    borderRadius: "12px",
                    padding: "10%",
                }}
            >
                {err && <p>Something went wrong</p>}
                {loading && <p>Loading data</p>}
                {added && <Navigate to="/" replace={true} />}
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
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
                            placeholder="first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Last Name
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
                            placeholder="last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label>
                        Date of Birth
                        <DatePicker
                            selected={DOB}
                            value={DOB}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(date) => setDOB(date)}
                            
                        />
                    </label>
                    <label>
                        Email
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
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Skill Level
                        <select
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
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                        >
                            <option key="null" value="">Select the Skill Level</option>
                            {skillList.map((skill_level) => (
                                <option
                                    key={skill_level.skill_level}
                                    value={skill_level.skill_level}
                                >
                                    {skill_level.skill_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Active Status
                        <select
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
                            value={active}
                            onChange={(e) => setActive(e.target.value)}
                        >
                            <option value={1}>active</option>
                            <option value={0}>inactive</option>
                        </select>
                    </label>
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
                            cursor: "pointer"
                        }}
                        type="submit"
                    >
                        ADD
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddEmployee;
