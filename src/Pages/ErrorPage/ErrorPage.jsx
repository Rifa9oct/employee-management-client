import { Link } from "react-router-dom";
import error from "../../assets/error.png"
import { FaArrowLeftLong } from "react-icons/fa6";

const ErrorPage = () => {
    return (
        <div>
            <Link to="/"><button className="bg-blue-500 py-2 px-4 text-white font-semibold rounded-lg mt-5 ml-32 hover:scale-105"><FaArrowLeftLong className="inline text-xl" /> Go Home</button></Link>
            <img className="w-full" src={error} />
            <h1 className="text-center font-extrabold text-2xl">We can not find that page !</h1>
        </div>
    );
};

export default ErrorPage;