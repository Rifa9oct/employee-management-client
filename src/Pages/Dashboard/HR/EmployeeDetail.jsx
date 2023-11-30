import { Link, useLoaderData } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";



const EmployeeDetail = () => {
    const data = useLoaderData();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`https://employee-management-server-omega.vercel.app/payments/${data.email}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setUsers(data))

    }, [data.email])
    console.log(users)

    return (
        <div className="mt-20">
            <Link to="/dashboard" className="rounded px-4 ml-20 py-2 text-blue-800 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                <FaArrowLeft className="text-lg inline" /> Go Back
            </Link>
            <div className="flex items-center justify-center gap-8 my-6">
                <img className="w-[80px] h-[80px] rounded-full" src={data.image} />
                <div>
                    <h1 className="font-bold text-3xl header">{data.name}</h1>
                    <p className="">{data.designation}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;