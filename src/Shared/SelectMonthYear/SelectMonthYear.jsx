import { useState } from "react";


const SelectMonthYear = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    return (
        <div>
            <div className="flex justify-evenly items-center mt-5">
                <div>
                    <label className="font-bold">Month: <br /></label>
                    <select id="month" value={month} onChange={handleMonthChange} className="border-2 px-3 mt-1 rounded border-cyan-400 w-[150px] p-1 ">
                        <option value="">Select Month</option>
                        {months.map((m, index) => (
                            <option key={index} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-bold">Year: <br /></label>
                    <input type="number" id="year" value={year} onChange={handleYearChange} placeholder="Enter year" className="w-[150px] border-2 px-3 mt-1 rounded border-cyan-400 focus:outline-none p-1"
                    />
                </div>
            </div>

            {/* Display the selected month and year */}
            <div className="mt-5 ml-[55px] mb-5">
                {month && <p className="mt-1"><span className="text-base font-bold">Selected Month :</span> {month}</p>}
                {year && <p><span className="text-base font-bold">Selected Year :</span> {year}</p>}
            </div>
        </div>
    );
};

export default SelectMonthYear;