import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import icon from "../../assets/icon.png"

const Footer = () => {
    return (
        <div className="bg-slate-300 ">
            <div className="flex justify-center gap-40 pt-10 items-center mb-10">
                <div className="flex flex-col items-center">
                    <img className="w-[70px]" src={icon} />
                    <p className="font-bold text-2xl mt-5">Follow Us</p>
                    <div className="flex gap-6 text-4xl ml-3 mt-2 list-none">
                        <li><FaFacebookSquare /></li>
                        <li><FaInstagram /></li>
                        <li><FaTwitter /></li>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-2xl">Quick Links</h1>
                    <ul>
                        <a><li className="hover:underline cursor-pointer">Home</li></a>
                        <a><li className="hover:underline cursor-pointer">About</li></a>
                        <a><li className="hover:underline cursor-pointer">Supports</li></a>
                        <a><li className="hover:underline cursor-pointer">Products</li></a>
                        <a><li className="hover:underline cursor-pointer">Contact</li></a>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold text-2xl">Company</h1>
                    <ul>
                        <a><li className="hover:underline cursor-pointer">How we works?</li></a>
                        <a><li className="hover:underline cursor-pointer">Security</li></a>
                        <a><li className="hover:underline cursor-pointer">Selling</li></a>
                        <a><li className="hover:underline cursor-pointer">Capital</li></a>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold text-2xl">Help</h1>
                    <ul>
                        <a><li className="hover:underline cursor-pointer">Privacy</li></a>
                        <a><li className="hover:underline cursor-pointer"> Condition</li></a>
                        <a><li className="hover:underline cursor-pointer">Blog</li></a>
                        <a><li className="hover:underline cursor-pointer">FAQs</li></a>
                    </ul>
                </div>
            </div>
            <h1 className="text-center pb-5 text-xs">All rights reserved copyright@2023 startup landing page design</h1>
        </div>
    );
};

export default Footer;