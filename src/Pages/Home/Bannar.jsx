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
            <Carousel autoPlay infiniteLoop showArrows={false} className="mt-10 md:mt-0 text-center">
                <div className="relative">
                    <img src={img1} />
                    <h1 className=" bg-purple-800 p-[20px] md:p-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-20 text-xl md:text-3xl  lg:text-5xl font-bold absolute lg:top-[180px] top-6 md:top-[50px] left-[50px] lg:left-[80px] border">ONE OF THE<br />FIRSTEST WAY<br />TO GROUTH</h1>
                </div>
                <div className="relative">
                    <img src={img3} />
                    <h1 className=" bg-cyan-900 py-5 md:py-[70px] px-[25px] md:px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-40 text-xl md:text-3xl lg:text-5xl font-bold absolute top-[50px] left-[50px] lg:top-[180px] lg:left-[80px] border">TIME<br />MANAGEMENT</h1>
                </div>
                <div className="relative">
                    <img src={img2} />
                    <h1 className=" bg-amber-900 py-5 px-10 md:p-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-20 md:text-5xl lg:text-6xl font-bold absolute top-[50px] left-[50px] lg:top-[200px] lg:left-[80px] border">CREATIVE <br /> PROCESS</h1>
                </div>
                <div className="relative">
                    <img src={img4} />
                    <h1 className=" bg-slate-700 py-5 md:py-[70px] px-[30px] md:px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-30 text-xl md:text-5xl lg:text-6xl font-bold absolute top-[70px] left-[50px] lg:top-[200px] lg:left-[80px] border">ANALYSIS</h1>
                </div>
                <div className="relative">
                    <img src={img5} />
                    <h1 className=" bg-stone-500 py-5 md:py-[70px] px-[25px] md:px-[50px] text-white rounded-tr-[80px] rounded-bl-[80px] bg-opacity-40 text-xl md:text-5xl lg:text-6xl font-bold absolute lg:top-[200px] lg:left-[80px] top-[60px] left-[50px] border">SUCCESS</h1>
                </div>
            </Carousel>
        </div>
    );
};

export default Bannar;