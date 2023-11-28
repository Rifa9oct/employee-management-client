import { PiPhoneCallFill } from "react-icons/pi";
import { MdMarkEmailRead } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const InTach = () => {
    const bgImg = {
        backgroundImage: 'url("https://i.ibb.co/Wc30LCq/bg.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center"
    };
    return (
        <div className="max-w-[1320px] rounded-xl mx-auto my-20" style={bgImg}>
            <div className="text-center font-bold pt-10">
                <p className="text-lg text-cyan-500">---- Get In Touch ----</p>
                <h1 className="text-3xl text-white">Hey! Let’s Talk</h1>
            </div>
            <div className="flex justify-center gap-12 pt-10 pb-16">
                <div className="w-[500px] h-[345px] bg-white rounded-lg">
                    <input type="text" placeholder="Name" className="bg-[#F7F7F7] rounded border text-sm px-3 py-2 w-[440px] mx-8 mt-10 " />
                    <input type="text" placeholder="Email" className="bg-[#F7F7F7] rounded border text-sm px-3 py-2 w-[440px] mx-8 my-3" />
                    <input type="text" placeholder="Phone" className="bg-[#F7F7F7] rounded border text-sm px-3 py-2 w-[440px] mx-8" />
                    <input type="" placeholder="Your message" className="bg-[#F7F7F7] rounded border text-sm px-3 py-2 w-[440px] pb-14 mx-8 my-3" />
                    <input type="submit" className="px-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 mx-8" />
                </div>
                <div className="w-[300px] h-[345px] flex flex-col items-start pl-10 rounded-lg justify-center bg-white">
                    <div className="flex items-center  gap-5 justify-center">
                        <div className="flex items-center">
                            <PiPhoneCallFill className="text-3xl text-red-500" />
                        </div>
                        <div>
                            <p className="text-red-500 font-bold">Call Anytime</p>
                            <div className="text-xs">
                                <li>+ 91 23678 27867</li>
                                <li>+ 91 67678 92878</li>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-5 justify-center">
                        <div className="flex items-center">
                            <MdMarkEmailRead className="text-3xl text-red-500" />
                        </div>
                        <div>
                            <p className="text-red-500 font-bold">Send Email</p>
                            <div className="text-xs">
                                <li>connect@itfirms.com</li>
                                <li>hello@itfirms.com</li>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-5 justify-center">
                        <div className="flex items-center">
                            <IoLocationSharp className="text-3xl text-red-500" />
                        </div>
                        <div>
                            <p className="text-red-500 font-bold">Visit Us</p>
                            <div className="text-xs">
                                <li>20 Island Park Road,</li>
                                <li>New Jearsy, New York, USA</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InTach;