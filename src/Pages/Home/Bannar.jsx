import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../assets/img1.png"
import img2 from "../../assets/img2.png"
import img3 from "../../assets/img3.png"
import img4 from "../../assets/img4.png"
import img5 from "../../assets/img5.png"

const Bannar = () => {
    return (
        <div>
            <Carousel autoPlay infiniteLoop showArrows={false} className="text-center">
                <div className="relative">
                    <img src={img1} />
                    <h1 className=" bg-purple-800 p-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-20 text-5xl font-bold absolute top-[180px] left-[80px] border">ONE OF THE<br />FIRSTEST WAY<br />TO GROUTH</h1>
                </div>
                <div className="relative">
                    <img src={img3} />
                    <h1 className=" bg-cyan-900 py-[70px] px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-40 text-5xl font-bold absolute top-[180px] left-[80px] border">TIME<br />MANAGEMENT</h1>
                </div>
                <div className="relative">
                    <img src={img2} />
                    <h1 className=" bg-amber-900 p-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-20 text-6xl font-bold absolute top-[200px] left-[80px] border">CREATIVE <br /> PROCESS</h1>
                </div>
                <div className="relative">
                    <img src={img4} />
                    <h1 className=" bg-slate-700 py-[70px] px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-30 text-6xl font-bold absolute top-[200px] left-[80px] border">ANALYSIS</h1>
                </div>
                <div className="relative">
                    <img src={img5} />
                    <h1 className=" bg-stone-500 py-[70px] px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-40 text-6xl font-bold absolute top-[200px] left-[80px] border">SUCCESS</h1>
                </div>
            </Carousel>
        </div>
    );
};

export default Bannar;