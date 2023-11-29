import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaArrowLeft } from "react-icons/fa6";


const EmployeeDetail = () => {
    const data = useLoaderData();
    // console.log(data)
    return (
        <div className="mt-20">
            <Link to="/dashboard" className="rounded px-4 ml-20 py-2 text-blue-800 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
            <FaArrowLeft className="text-lg inline" /> Go Back
            </Link>
            <div>
                <SectionTitle
                    heading="Employee List"
                    subTitle={data.name}
                ></SectionTitle>
            </div>
            <h1>{data.name} Details</h1>
        </div>
    );
};

export default EmployeeDetail;