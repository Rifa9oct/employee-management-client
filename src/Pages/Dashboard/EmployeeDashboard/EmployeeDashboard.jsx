import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { AuthContext } from "../../../AuthProvider/AuthContext";
import { Link } from "react-router-dom";
const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch(`https://employee-management-server-omega.vercel.app/payments/${user.email}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.monthYear);
                    const dateB = new Date(b.monthYear);
                    return dateB - dateA;
                });
                setDatas(sortedData);
            });
    }, [user.email]);


    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Calculate the index range for the current page
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = datas.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(datas.length / usersPerPage);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="pt-16 mb-8">
            <SectionTitle
                subTitle={user.displayName}
                heading="PAYMENT HISTORY"
            ></SectionTitle>

            <div className="overflow-x-auto mt-10 mx-20">
                <table className="table border-4 border-cyan-300 max-w-[900px] mx-auto">
                    <thead className="bg-cyan-100 text-black">
                        <tr className="text-xl border-4 border-cyan-300 text-center">
                            <th className="border-4 border-cyan-300">Index</th>
                            <th className="border-4 border-cyan-300">Month</th>
                            <th className="border-4 border-cyan-300">Amount</th>
                            <th className="border-4 border-cyan-300">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers?.map((item, index) => <tr key={item._id} className="border-4 border-cyan-300">
                                <td className="border-4 border-cyan-300 text-center">{firstIndex + index + 1}</td>
                                <td className="border-4 border-cyan-300">{item.monthYear}</td>
                                <td className="border-4 border-cyan-300">$ {item.amount}</td>
                                <td className="border-4 border-cyan-300">{item.transactionId}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            
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

            <div className="flex justify-center my-10">
                <Link to="/worksheet">
                    <button className="ml-5 py-2 rounded-full px-8 border-0 text-base outline outline-purple-500 hover:bg-purple-500 hover:text-white text-purple-500 font-bold hover:scale-105 transition">My Work Sheet</button>
                </Link>
            </div>
        </div>
    );
};

export default EmployeeDashboard;