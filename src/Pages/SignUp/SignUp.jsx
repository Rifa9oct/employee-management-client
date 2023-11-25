import { useContext } from "react";
import video from "../../assets/videos/signup.mp4"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthContext";
import line from "../../assets/line.png";
import logo from "../../assets/logo.png";

const Signup = () => {
    const { signInWithGoogle, createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(res => {
                // console.log(result.user);
                reset();
                Swal.fire("Great!", "Sign up successfully", "success");
                updateProfile(res.user, {
                    displayName: data.name,
                    photoURL: data.photoUrl
                })
                navigate("/");
            })
            .catch(error => {
                Swal.fire("Opps!", error.message, "error");
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                navigate("/")
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

            <div className="flex items-center gap-16 justify-center mb-16 mx-10 p-5 lg:p-0">
                <video className="hidden lg:block" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="rounded-2xl border-gradient  p-1">
                    <h1 className="text-5xl text-black text-center font-extrabold my-5">SIGN UP</h1>

                    <p className="text-sm font-bold text-center my-2">Already Have an Account ? <Link to="/signin"><span className="header text-base">Please Sign In</span></Link></p>

                    {/* continue with google */}
                    <div className="flex items-center justify-center gap-4 font-semibold text-center">
                        <p className="text-sm font-bold">Sign up with</p>
                        <button onClick={handleGoogleSignIn} className="flex items-center gap-1 border-2 py-2 px-3 rounded-lg border-cyan-400 hover:text-blue-500 cursor-pointer"><FcGoogle className="text-2xl"></FcGoogle>Google</button>
                    </div>

                    <div className="flex items-center mt-3 justify-center">
                        <img className="w-1/4" src={line} />
                        <p className="font-medium mx-3">OR</p>
                        <img className="w-1/4" src={line} />
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body px-10 mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between lg:gap-5">
                            <div>
                                <label>
                                    <span>Name</span>
                                </label>
                                <div>
                                    <input type="text" {...register("name", { required: true })}
                                        name="name" placeholder="your name" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                    {errors.name && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Name field is required.</span>}
                                </div>
                            </div>

                            <div>
                                <label>
                                    <span>Email</span>
                                </label>
                                <div>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="your email" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                    {errors.email && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Email address is required.</span>}
                                </div>
                            </div>

                            <div>
                                <label>
                                    <span>Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/ })}
                                        name="password" placeholder="Password" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" />
                                    {errors.password?.type === "required" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password is required.</p>}
                                    {errors.password?.type === "minLength" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password must be 6 characters.</p>}
                                    {errors.password?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password must be less than 20 characters.</p>}
                                    {errors.password?.type === "pattern" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password must have one upper case, one number, one special character.</p>}

                                    <span className="absolute top-5 right-4" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                        }
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label>
                                    <span>Bank_Account_No</span>
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        {...register("account", { required: true, maxLength: 16, pattern: /^[0-9]{16}$/ })}
                                        name="account" placeholder="account no" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" />
                                    {errors.account?.type === "required" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No is required.</p>}
                                    {errors.account?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No max length should be 16 digits.</p>}
                                    {errors.account?.type === "pattern" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No must be only number.</p>}
                                </div>
                            </div>

                            <div>
                                <label>
                                    <span>Salary</span>
                                </label>
                                <div>
                                    <input type="text" {...register("salary", { required: true })}
                                        name="salary" placeholder="total salary" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                    {errors.salary && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Salary field is required.</span>}
                                </div>
                            </div>

                            <div>
                                <label>Role<br /></label>
                                <select {...register("role")} className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" >
                                    <option value="Employee">Employee</option>
                                    <option value="HR">HR</option>
                                    <option value="Admin" disabled>Admin</option>
                                </select>
                            </div>

                            <div>
                                <label>Designation <br /></label>
                                <select {...register("designation")} className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" >
                                    <option value="Development Coordinator">Development Coordinator</option>
                                    <option value="Team Lead" selected>Team Lead</option>
                                    <option value="Security Administrator">Security Administrator</option>
                                    <option value="Regular Employee">Regular Employee</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Specialist">Specialist</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label>
                                    <span>Photo URL</span>
                                </label>
                                <div>
                                    <input type="file" {...register("photo url")} name="photo url" placeholder="your photo url" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                </div>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="w-full py-2 rounded-xl mb-8 text-white bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">Sign Up</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Signup;