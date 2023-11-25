import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { AuthContext } from "../AuthProvider/AuthContext";
import "../Navbar/navbar.css";
import list from "../assets/list.png"

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdown, setDropdown] = useState(false);
    const [menuDrop, setMenuDrop] = useState(false);

    const navLinks = <>
        <li> <NavLink to="/" className={({ isActive, isPending }) =>
            isActive ? "active  text-red-500" : isPending ? "pending" : ""}>Home</NavLink>
        </li>
    </>


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    'Thank you',
                    'Sign Out successfully',
                    'success'
                )
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="md:bg-purple-100 flex flex-col md:flex-row justify-between items-center  px-5 lg:px-32">
            <div className="flex flex-row items-center">
                <div className="relative mr-3 mt-3 block lg:hidden">
                    <div onClick={()=> setMenuDrop(!menuDrop)}><img src={list} alt="list icon" /></div>
                    {
                        menuDrop ?
                            <>
                                <ul tabIndex={0} className="transition rounded-lg absolute flex top-[30px] left-0 flex-col gap-4 mt-3 p-6 py-6 shadow-lg bg-purple-100 w-48">
                                    {navLinks}
                                </ul>
                            </> : ""

                    }
                </div>
                <div className="flex items-center gap-3">
                    <img className="w-[50px] mt-5" src={logo} />
                    <h1 className="header text-3xl font-bold text-black">Employee Management</h1>
                </div>
            </div>

            <div>
                <ul className="hidden text-purple-600 tracking-wider text-xl font-bold lg:flex items-center gap-8">
                    {navLinks}
                </ul>
            </div>

            <div className="">
                {
                    user ?
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {
                                    user.photoURL ?
                                        <img className="w-[50px] h-[50px] mx-3 rounded-full border-[2px]" src={user.photoURL} /> :
                                        <img className="w-[50px] h-[50px] mx-3 rounded-full border-blue-900" src="https://i.ibb.co/VC1vhmp/user.png" />
                                }
                                <a onClick={handleLogOut} className="flex items-center md:hidden btn text-bsm bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:scale-110 transition"> <LuLogOut className="text-xl" />Sign Out</a>
                            </div>

                            {/* dropdown signout */}
                            <div className="hidden md:block">
                                {
                                    dropdown ?
                                        <div>
                                            <p onClick={() => setDropdown(!dropdown)}><IoIosArrowUp className="text-2xl cursor-pointer text-black" /></p>
                                            <div className="absolute z-10 top-[80px] right-[40px] w-[300px] rounded-lg shadow-lg transit bg-black bg-opacity-60">
                                                <div className="flex items-center gap-2 justify-center pt-10">
                                                    {
                                                        user.photoURL ?
                                                            <img className="w-[45px] h-[45px] mx-3 rounded-full " src={user.photoURL} /> :
                                                            <img className="w-[45px] h-[45px] mx-3 rounded-full border-blue-900" src="https://i.ibb.co/VC1vhmp/user.png" />
                                                    }
                                                    <div className="text-black">
                                                        <p className="font-extrabold">{user.displayName}</p>
                                                        <p className="text-sm">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="divider pt-5"></div>
                                                <div onClick={handleLogOut} className="flex items-center gap-2 ml-12 pt-4 pb-10 cursor-pointer text-white ">
                                                    <LuLogOut className="text-2xl" />
                                                    <a className="font-extrabold">Sign Out</a>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div>
                                            <p onClick={() => setDropdown(!dropdown)}><IoIosArrowDown className="text-2xl cursor-pointer text-white " /></p>

                                        </div>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <Link to="/signin">
                                <button className="py-2 rounded-full px-8 border-0 text-base bg-gradient-to-r outline tracking-wider outline-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold hover:scale-105 transition">Sign In</button>
                            </Link>
                            <Link to="/signup">
                                <button className="ml-5 py-2 rounded-full px-8 border-0 text-base outline outline-purple-500 tracking-wider hover:bg-purple-500 hover:text-white text-purple-500 font-bold hover:scale-105 transition">Sign Up</button>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;