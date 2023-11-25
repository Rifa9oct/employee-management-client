import { useContext, useState } from "react";
import video from "../../assets/videos/signin.mp4"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from "../../AuthProvider/AuthContext"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import line from "../../assets/line.png"

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signinUser, setLogin, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || "/";

    const handleSignin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signinUser(email, password)
            .then(() => {
                Swal.fire("Good job", "Sign In successful", "success");
                setLogin(true);
                navigate(from, { replace: true })
                e.target.reset();
            })
            .catch(error => {
                Swal.fire("Sign In Error", error.message, "error")
                console.log(error);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <Link to="/" className="flex items-center gap-3 pl-32 mt-5">
                <img className="w-[50px] mt-5" src={logo} />
                <h1 className="header text-3xl font-bold text-black">Employee Management</h1>
            </Link>
            <div className="flex items-center gap-20 justify-center">
                <video className="hidden lg:block ml-12  w-[550px]" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>

                <div className="rounded-2xl border-gradient w-[500px] p-1">
                    <h1 className="text-4xl text-black text-center font-extrabold my-5">SIGN IN</h1>

                    <p className="text-sm font-bold text-center my-2">New here ? <Link to="/signup"><span className="header text-base">Create a New Account</span></Link></p>
                    {/* continue with google */}
                    <div className="flex items-center justify-center gap-4 font-semibold text-center">
                        <p className="text-sm font-bold">Sign in with</p>
                        <button onClick={handleGoogleSignIn} className="flex items-center gap-1 border-2 py-2 px-3 rounded-lg border-cyan-400 hover:text-blue-500 cursor-pointer"><img className="w-[30px]" src={google} />Google</button>
                    </div>
                    <div className="flex items-center mt-3 justify-center">
                        <img className="w-1/4" src={line} />
                        <p className="font-medium mx-3">OR</p>
                        <img className="w-1/4" src={line} />
                    </div>

                    <form onSubmit={handleSignin} className="px-10 pt-5">
                        <div>
                            <label>
                                <span>Email</span>
                            </label>
                            <div className="relative">
                                <input type="email" name="email" placeholder="your email" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" />
                                <span className="absolute top-6 right-4" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                        </div>

                        <label className="mb-2">
                            <a href="#" className="text-sm text-gray-600 hover:underline hover:underline-offset-2 ">Forgot password?</a>
                        </label>

                        <div className="form-control mt-6">
                            <button type="submit" className="w-full py-2 rounded-xl mb-8 text-white bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">Sign In</button>
                        </div>
                    </form>
                </div >
            </div >
        </div>
    );
};

export default SignIn;