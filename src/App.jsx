import Login from "./Pages/Auth/Login";
import { Route, Routes } from "react-router-dom";
import EmployeePage from "./Pages/Employee/EmployeePage";
import useToken from "./Authentication/useToken";
import AddEmployee from "./Pages/Employee/AddEmployee";
import EditEmployee from "./Pages/Employee/EditEmployee";

const App = () => {
    //TODO: refactory the authentication -> state management
    const [token, setToken] = useToken();
    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <>
            <div>
                <Routes>
                    <Route
                        path="/auth"
                        element={<Login setToken={setToken} />}
                    />
                    <Route path="/" element={<EmployeePage />} />
                    <Route path="/add_new_employee" element={<AddEmployee />} />
                    <Route path="/edit_employee/:id" element={<EditEmployee />}/>
                </Routes>
            </div>
        </>
    );
};

export default App;
