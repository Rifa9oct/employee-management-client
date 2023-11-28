import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EmployeeDetail from "../Pages/Dashboard/HR/EmployeeDetail";
import PrivateRoute from "./PrivateRoute";
import Contact from "../Pages/ContactUs/Contact";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home> ,
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: "/employeeDetails/:id",
                element: <EmployeeDetail></EmployeeDetail>,
                loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
            },
            {
                path: "/contact",
                element: <Contact></Contact>,
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>,
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>,
            },
        ]
    },
]);

export default router;