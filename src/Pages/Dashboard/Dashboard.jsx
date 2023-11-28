import AdminDashboard from "./AdminDashboard/AdminDashboard";
import HrDashboard from "./HR/HrDashboard";
import useAdmin from "../../hooks/useAdmin"
import useHr from "../../hooks/useHr";
import useEmployee from "../../hooks/useEmployee";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isHr] = useHr();
    const [isEmployee] = useEmployee();

    return (
        <div>
            {isAdmin && <AdminDashboard></AdminDashboard>}
            {isHr && <HrDashboard></HrDashboard>}
            {isEmployee && <EmployeeDashboard></EmployeeDashboard>}   
        </div>
    );
};

export default Dashboard;