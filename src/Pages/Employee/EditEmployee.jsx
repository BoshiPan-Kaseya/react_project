import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../Authentication/useToken";
import Login from "../Auth/Login";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "../../Utils/DateFormat";

const EditEmployee = () => {
    const [token, setToken] = useToken();
    if (!token) {
        return <Login setToken={setToken} />;
    }

    const navigate = useNavigate();

    const { state } = useLocation();
    const [info, setInfo] = useState(state);
    const [skillList, setSkillList] = useState([]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        await fetch(
            import.meta.env.VITE_TEST_API_ENTRY +
                import.meta.env.VITE_EMPOLYEE_ENDPOINT +
                `/${info.employee_id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    first_name: info.first_name,
                    last_name: info.last_name,
                    DOB: dateFormat(info.DOB),
                    email: info.email,
                    skill_level: info.skill_name,
                    active: info.active,
                    age:
                        new Date().getFullYear() -
                        new Date(info.DOB).getFullYear(),
                }),
            }
        )
            .then((data) => data.json())
            .then((data) => {
                if (data.success === 1) {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const fetch_skill = async () => {
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
                .then((res) => res.json())
                .then((res) => setSkillList(res.data));
        };

        fetch_skill();
    }, []);

    return (
        <div>
            <form onSubmit={handleUpdateSubmit}>
                <label>
                    First Name
                    <input
                        type="text"
                        value={info.first_name}
                        onChange={(e) =>
                            setInfo({ ...info, first_name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={info.last_name}
                        onChange={(e) =>
                            setInfo({ ...info, last_name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        value={info.email}
                        onChange={(e) =>
                            setInfo({ ...info, email: e.target.value })
                        }
                    />
                </label>
                <label>
                    Date of Birth
                    <DatePicker
                        defaultValue={info.DOB}
                        value={dateFormat(info.DOB)}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(date) =>
                            setInfo({ ...info, DOB: dateFormat(date) })
                        }
                    />
                </label>
                <label>
                    Skill Level
                    <select
                        value={
                            skillList.filter((skill) => {
                                return skill.skill_name === info.skill_name;
                            }).skill_level
                        }
                        onChange={(e) =>
                            setInfo({ ...info, skill_name: e.target.value })
                        }
                    >
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
                        value={info.active}
                        defaultValue={info.active}
                        onChange={(e) =>
                            setInfo({ ...info, active: e.target.value })
                        }
                    >
                        <option value={1}>active</option>
                        <option value={0}>inactive</option>
                    </select>
                </label>
                <button type="submit">UPDATE</button>
            </form>
        </div>
    );
};

export default EditEmployee;
