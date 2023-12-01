import { FaArrowRightLong } from "react-icons/fa6";
import "./services.css"

const ServiceCard = ({item}) => {
    return (
        <div className="mt-[130px] mx-auto card-content relative w-[400px] h-[250px] shadow-lg rounded-lg hover:h-[350px] transition-all px-[30px] py-[50px] bg-[#fff] border cursor-pointer">
            <div className="imgbox relative z-10 w-full h-full transform translate-y-[-120px]">
                <img className="w-full rounded-lg shadow-lg" src=
                {item.image} />
            </div>
            <div className="description px-5 py-3 text-center">
                <h2 className="header text-2xl font-bold">{item.name}</h2>
                <p className="text-xs text-gray-500">{item.description}</p>
                <FaArrowRightLong className="text-pink-500 text-right text-xl ml-[280px]" />
            </div>
        </div>
    );
};

export default ServiceCard;