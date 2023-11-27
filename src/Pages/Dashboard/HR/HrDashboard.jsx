import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import validImg from "../../../assets/valid.png"
import invalidImg from "../../../assets/invalid.png"
import Swal from "sweetalert2";
import { FaCcAmazonPay } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const HrDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const hrData = users.filter(user => user.role === "employee");
    const adminData = users.filter(user => (user.verified === true || user.role === "hr"));

    const handleVerified = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This employee is going to be verified !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes !"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${user.name} is an verified Now`,
                                showCancelButton: false,
                                timer: 1500
                            });
                        }
                        refetch();
                    })
            }
        });
    }


    console.log(hrData.length, adminData.length);

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Calculate the index range for the current page
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <h1 className="text-center text-4xl pt-32">All EMPLOYEE LIST</h1>
            <div className="overflow-x-auto mb-20 mx-20 absolute top-[200px] left-[85px]">
                <table className="table border-4 border-cyan-300">
                    <thead className="bg-cyan-100 text-black">
                        <tr className="text-xl border-4 border-cyan-300 text-center">
                            <th className="border-4 border-cyan-300">Index</th>
                            <th className="border-4 border-cyan-300">Name</th>
                            <th className="border-4 border-cyan-300">Email</th>
                            <th className="border-4 border-cyan-300">Verification</th>
                            <th className="border-4 border-cyan-300">Bank Account No</th>
                            <th className="border-4 border-cyan-300">Salary</th>
                            <th className="border-4 border-cyan-300">Details</th>
                            <th className="border-4 border-cyan-300">Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers?.map((item, index) => <tr key={item._id} className="border-4 border-cyan-300">
                                <td className="border-4 border-cyan-300">{firstIndex + index + 1}</td>
                                <td className="border-4 border-cyan-300">{item.name}</td>
                                <td className="border-4 border-cyan-300">{item.email}</td>
                                <td className="border-4 border-cyan-300">
                                    <div className="flex justify-center">
                                        {
                                            item.verified ? <button onClick={() => handleVerified(item)}><img className="w-[35px]" src={validImg} /></button> :
                                                <button onClick={() => handleVerified(item)}><img className="w-[35px]" src={invalidImg} /></button>
                                        }
                                    </div>
                                </td>
                                <td className="border-4 border-cyan-300">{item.account_no}</td>
                                <td className="border-4 border-cyan-300">$ {item.salary}</td>
                                <td className="border-4 border-cyan-300">
                                    <button className="bg-red-400 p-2 rounded-lg hover:bg-red-600 text-xs font-bold text-white">Details</button>
                                </td>
                                <td>
                                    <button className="text-xl text-blue-500 hover:text-blue-700"><FaCcAmazonPay className="text-4xl" /></button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex justify-center mt-4">
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
            </div>
        </div>
    );
};

export default HrDashboard;