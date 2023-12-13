import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import icon from "../../assets/icon.png"

const Footer = () => {
    return (
        <div className="bg-purple-100 ">
            <div className="flex flex-col md:flex-row justify-center gap-10 lg:gap-40 pt-10 items-center mb-10">
                <div className="flex flex-col items-center">
                    <img className="w-[70px]" src={icon} />
                    <p className="font-bold text-xl md:text-2xl mt-5 header">Follow Us</p>
                    <div className="flex gap-6 text-3xl lg:text-4xl ml-3 mt-2 list-none text-blue-600">
                        <li><FaFacebookSquare /></li>
                        <li><FaInstagram /></li>
                        <li><FaTwitter /></li>
                    </div>
                </div>
                <div className="flex gap-10 lg:gap-40 justify-center">
                    <div>
                        <h1 className="font-bold text-2xl header">Quick Links</h1>
                        <ul className="text-sm">
                            <a><li className="hover:underline cursor-pointer">Home</li></a>
                            <a><li className="hover:underline cursor-pointer">About</li></a>
                            <a><li className="hover:underline cursor-pointer">Supports</li></a>
                            <a><li className="hover:underline cursor-pointer">Products</li></a>
                            <a><li className="hover:underline cursor-pointer">Contact</li></a>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl md:text-2xl header">Company</h1>
                        <ul className="text-sm">
                            <a><li className="hover:underline cursor-pointer">How we works?</li></a>
                            <a><li className="hover:underline cursor-pointer">Security</li></a>
                            <a><li className="hover:underline cursor-pointer">Selling</li></a>
                            <a><li className="hover:underline cursor-pointer">Capital</li></a>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl md:text-2xl header">Help</h1>
                        <ul className="text-sm">
                            <a><li className="hover:underline cursor-pointer">Privacy</li></a>
                            <a><li className="hover:underline cursor-pointer"> Condition</li></a>
                            <a><li className="hover:underline cursor-pointer">Blog</li></a>
                            <a><li className="hover:underline cursor-pointer">FAQs</li></a>
                        </ul>
                    </div>
                </div>
            </div>
            <h1 className="text-center pb-5 text-xs">All rights reserved copyright@2023 TalentEase Tech company</h1>
        </div>
    );
};

export default Footer;