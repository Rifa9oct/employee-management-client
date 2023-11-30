import firedImg from "../../../assets/fired.png"
import hrImg from "../../../assets/hr.png"
import employeeImg from "../../../assets/employee.png"

const CardGrid = ({ currentUsers, handleMakeHr, handleFired }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20 max-w-[900px] lg:mx-auto m-5">
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
                            user.role === "employee" ? <button onClick={() => handleMakeHr(user)} className="btn btn-sm text-xs bg-cyan-200 hover:bg-cyan-400">Make HR</button> : ""
                        }
                    </div>

                    <p className="text-lg font-semibold text-center">{user.name}</p>
                    <p className="text-center">{user.designation}</p>

                    <div onClick={() => handleFired(user)} className="mt-2 cursor-pointer">
                        {
                            user.fired ? <h1 className="font-bold text-center text-red-500" >FIRED</h1> : <img className="w-[40px] mx-auto" src={firedImg} />
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;