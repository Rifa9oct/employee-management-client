import firedImg from "../../../assets/fired.png"
import hrImg from "../../../assets/hr.png"
import employeeImg from "../../../assets/employee.png"

const CardGrid = ({currentUsers,handleMakeHr}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-20 max-w-[900px] mx-auto">
            {currentUsers.map((user) => (
                <div key={user._id} className="bg-cyan-50 p-4 shadow-md border hover:scale-110 transition-all">
                    <div className="flex justify-center">
                        {user.role === "hr" ? (
                            <img className="w-[40px] mx-auto" src={hrImg} alt={`${user.name} - HR`} />
                        ) : (
                            <img className="w-[40px] mx-auto" src={employeeImg} alt={`${user.name} - Employee`} />
                        )}
                    </div>
                    <div className="flex justify-center">
                        {
                            user.role === "employee"? <button  onClick={() => handleMakeHr(user)}  className="btn btn-sm text-xs bg-cyan-200 hover:bg-cyan-400">Make HR</button> :""
                        }
                    </div>

                    <p className="text-lg font-semibold text-center">{user.name}</p>
                    <p className="text-center">{user.designation}</p>

                    <div className="mt-2">
                        <img className="w-[40px] mx-auto" src={firedImg} alt="Fire" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;