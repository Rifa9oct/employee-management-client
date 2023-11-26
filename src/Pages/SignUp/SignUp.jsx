import { useContext } from "react";
import video from "../../assets/videos/signup.mp4"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthContext";
import logo from "../../assets/logo.png";
import useAxiosPublic from "../../hooks/useAxiosPublic";

//img upload
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // console.log(data)

        createUser(data.email, data.password)
            .then(async (result) => {
                // console.log(result.user);
                
                // image upload to imgbb and tthen get an url
                const imageFile = {
                    image: data.image[0]
                }
                const res = await axiosPublic.post(img_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                if (res.data.success) {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        account_no: parseFloat(data.account_no),
                        designation: data.designation,
                        role: data.role,
                        salary: parseFloat(data.salary),
                        image: res.data.data.display_url,
                        verified: false
                    }
                    const usersCreate = await axiosPublic.post("/users", userInfo);

                    if (usersCreate.data.insertedId) {
                        Swal.fire("Great!", "Sign up successfully", "success");
                        updateProfile(result.user, {
                            displayName: userInfo.name,
                            photoURL: userInfo.image
                        })
                        navigate("/");
                    }
                }
                reset();
            })
            .catch(error => {
                Swal.fire("Opps!", error.message, "error");
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
                                        type="number"
                                        {...register("account_no", { required: true, maxLength: 16, pattern: /^[0-9]{16}$/ })}
                                        name="account_no" placeholder="account no" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" />
                                    {errors.account_no?.type === "required" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No is required.</p>}
                                    {errors.account_no?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No max length should be 16 digits.</p>}
                                    {errors.account_no?.type === "pattern" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Account No must be only number.</p>}
                                </div>
                            </div>

                            <div>
                                <label>
                                    <span>Salary</span>
                                </label>
                                <div>
                                    <input type="number" {...register("salary", { required: true })}
                                        name="salary" placeholder="total salary" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                    {errors.salary && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Salary field is required.</span>}
                                </div>
                            </div>

                            <div>
                                <label>Role<br /></label>
                                <select {...register("role", { required: true })} className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" >
                                    <option value="">Select Role</option>
                                    <option value="Employee">Employee</option>
                                    <option value="HR">HR</option>
                                    <option value="Admin" disabled>Admin</option>
                                </select>
                                {errors.role && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> This field is required.</span>}
                            </div>

                            <div>
                                <label>Designation <br /></label>
                                <select {...register("designation", { required: true })} className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none">
                                    <option value="">Select Designation</option>
                                    <option value="Development Coordinator">Development Coordinator</option>
                                    <option value="Team Lead">Team Lead</option>
                                    <option value="Security Administrator">Security Administrator</option>
                                    <option value="Regular Employee">Regular Employee</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Specialist">Specialist</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.designation && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> This field is required.</span>}

                            </div>

                            <div>
                                <label>
                                    <span>Photo URL</span>
                                </label>
                                <div>
                                    <input type="file" {...register("image", { required: true })} name="image" placeholder="your photo url" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                                    {errors.image && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Image field is required.</span>}
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