import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../AuthProvider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const WorkSheet = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure()
    const handleSubmit = e => {
        e.preventDefault();
        const email = user.email;
        const name = user.displayName;
        const task = e.target.task.value;
        const workHour =  parseInt(e.target.workHour.value);

        const workSheet = { name, email, task, workHour, startDate }
        axiosSecure.post("/worksheet", workSheet)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Great!", "Worksheet added successfully", "success");
                }
                e.target.reset();
            })
            console.log(workSheet)
    }
    

return (
    <div className="w-[800px] bg-cyan-100 mx-auto rounded-lg mt-10 p-10">
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-6 items-center">
                <select name="task" required className="w-[200px] border-2 px-3 mt-1 rounded border-cyan-400 focus:outline-none p-1">
                    <option value="">Select Tasks</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="content">Content</option>
                    <option value="paper work">Paper Work</option>
                </select>
                <input name="workHour" type="number" required placeholder="hour work" className="w-[200px] border-2 px-3 mt-1 rounded border-cyan-400 focus:outline-none p-1" />

                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} required className="w-[200px] border-2 px-3 mt-1 rounded border-cyan-400 focus:outline-none p-1" />
            </div>

            <div className="flex justify-center mt-5">
                <button type="submit" className="bg-blue-500 py-2 px-4 text-white font-semibold rounded-lg mt-5 hover:scale-105" >Submit</button>
            </div>
        </form>
    </div>
);
};

export default WorkSheet;