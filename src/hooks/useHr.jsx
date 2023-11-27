import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useHr = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isHr, isPending: isHrLoading} = useQuery({
        queryKey:[user?.email,'isHr'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/hr/${user.email}`, {withCredentials: true});
            // console.log(res.data)
            return res.data?.hr;
        }
    })
    return [isHr, isHrLoading];
};

export default useHr;