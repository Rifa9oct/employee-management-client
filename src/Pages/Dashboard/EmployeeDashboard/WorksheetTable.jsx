
import moment from 'moment'; // Import Moment.js
import { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { AuthContext } from '../../../AuthProvider/AuthContext';

const WorksheetTable = ({ users }) => {
    const { user } = useContext(AuthContext); 

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Sorting state
    const [sortedUsers, setSortedUsers] = useState([]);

    // Calculate the index range for the current page
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;

    useEffect(() => {
        const sortedArray = users.slice().sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateB - dateA;
        });

        setSortedUsers(sortedArray);
    }, [users]);

    const formatDate = (dateString) => {
        return moment(dateString).format("DD-MM-YYYY");
    };

    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='my-20'>
            <SectionTitle
                subTitle={user.displayName}
                heading="Work Sheet Form"
            ></SectionTitle>
            
            <div className="overflow-x-auto mt-10 mx-20">
                <table className="table border-4 border-cyan-300 max-w-[900px] mx-auto">
                    <thead className="bg-cyan-100 text-black">
                        <tr className="text-xl border-4 border-cyan-300 text-center">
                            <th className="border-4 border-cyan-300">Index</th>
                            <th className="border-4 border-cyan-300">Name</th>
                            <th className="border-4 border-cyan-300">Task</th>
                            <th className="border-4 border-cyan-300">Work Hour</th>
                            <th className="border-4 border-cyan-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.slice(firstIndex, lastIndex).map((item, index) => (
                            <tr key={item._id} className="border-4 border-cyan-300">
                                <td className="border-4 border-cyan-300 text-center">{firstIndex + index + 1}</td>
                                <td className="border-4 border-cyan-300">{item.name}</td>
                                <td className="border-4 border-cyan-300">{item.task}</td>
                                <td className="border-4 border-cyan-300 text-center">{item.workHour} h</td>
                                <td className="border-4 border-cyan-300">{formatDate(item.startDate)}</td>
                            </tr>
                        ))}
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
        </div>
    );
};

export default WorksheetTable;
