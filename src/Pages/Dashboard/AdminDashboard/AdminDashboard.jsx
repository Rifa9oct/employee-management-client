import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useState } from "react";
import firedImg from "../../../assets/fired.png"
import hrImg from "../../../assets/hr.png"
import employeeImg from "../../../assets/employee.png"
import Swal from "sweetalert2";
import CardGrid from "./CardGrid";

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', { withCredentials: true });
            return res.data;
        }
    })

    const [viewMode, setViewMode] = useState("table");

    const adminData = users.filter(user => (user.verified === true && user.role === "employee") || user.role === "hr");

    const handleMakeHr = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This employee will be HR!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes !"
        }).then((result) => {
            if (result.isConfirmed) {
                const updateRole = { role: "hr" }
                axiosSecure.patch(`/users/hr/${user._id}`, updateRole)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${user.name} HR Now`,
                                showCancelButton: false,
                                timer: 1500
                            });
                        }
                        refetch();
                    })
            }
        });
    }

    const handleFired = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This employee is going to be fired !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes !"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/fired/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${user.name} is a Fired`,
                                showCancelButton: false,
                                timer: 1500
                            });
                        }
                        refetch();
                    })
            }
        });
    }

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Calculate the index range for the current page
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = adminData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(adminData.length / usersPerPage);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "table" ? "grid" : "table"));
    };

    return (
        <div className="mb-20 pt-32">
            <SectionTitle
                heading="All EMPLOYEE LIST"
                subTitle="Admin Only"
            ></SectionTitle>

            <div className="flex justify-center">
                <button onClick={toggleViewMode} className="btn text-blue-800 border-0 bg-cyan-300 hover:bg-cyan-400 mt-4">
                    {viewMode === "table" ? "Switch to Grid View" : "Switch to Table View"}
                </button>
            </div>

            <div>
                {viewMode === "table" ?
                    // table view
                    < div className="overflow-x-auto mt-10 max-w-[900px] mx-auto">
                        <table className="table border-4 border-cyan-300">
                            <thead className="bg-cyan-100 text-black">
                                <tr className="text-xl border-4 border-cyan-300 text-center">
                                    <th className="border-4 border-cyan-300">Index</th>
                                    <th className="border-4 border-cyan-300">Name</th>
                                    <th className="border-4 border-cyan-300">Designation</th>
                                    <th className="border-4 border-cyan-300">Make HR</th>
                                    <th className="border-4 border-cyan-300">Fire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentUsers?.map((item, index) => <tr key={item._id} className="border-4 border-cyan-300">
                                        <td className="border-4 border-cyan-300 text-center">{firstIndex + index + 1}</td>
                                        <td className="border-4 border-cyan-300">{item.name}</td>
                                        <td className="border-4 border-cyan-300 text-center">{item.designation}</td>
                                        <td className="border-4 border-cyan-300">
                                            {
                                                item.role === "hr" ? <>
                                                    <img className="w-[40px] mx-auto" src={hrImg} />
                                                </> :
                                                    <div className="flex flex-col gap-2 items-center">
                                                        <img className="w-[40px] mx-auto" src={employeeImg} />
                                                        <button onClick={() => handleMakeHr(item)} className="btn btn-sm text-xs bg-cyan-200 hover:bg-cyan-400">Make HR</button>
                                                    </div>
                                            }
                                        </td>
                                        <td className="border-4 border-cyan-300">
                                            <div onClick={() => handleFired(item)} >
                                               {
                                                 item.fired ? <h1 className="font-bold text-red-500" >FIRED</h1> : <img className="w-[40px] mx-auto" src={firedImg} />
                                               }
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> :
                    //card view
                    <CardGrid
                        currentUsers={currentUsers}
                        handleMakeHr={handleMakeHr}>
                    </CardGrid>
                }

                {/* Pagination controls */}
                <div className="flex justify-center mt-4 mb-20">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn bg-cyan-400 hover:bg-cyan-500"
                    >
                        Previous
                    </button>
                    <span className="mx-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn bg-cyan-400 hover:bg-cyan-500"
                    >
                        Next
                    </button>
                </div>
            </div >
        </div>
    )
};

export default AdminDashboard;


