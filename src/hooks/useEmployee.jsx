import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useEmployee = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isEmployee, isPending: isEmployeeLoading} = useQuery({
        queryKey:[user?.email,'isemployee'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/employee/${user.email}`, {withCredentials: true});
            // console.log(res.data)
            return res.data?.employee;
        }
    })
    return [isEmployee, isEmployeeLoading];
};

export default useEmployee;