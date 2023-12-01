import { useEffect, useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch("fakeData.json")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    // console.log(services)
    return (
        <div className="my-20">
            <SectionTitle
                heading="SERVICES WE PROVIDE"
                subTitle="Find for your's"
            ></SectionTitle>

            <div className="max-w-[1420px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center">
                {
                    services.map(item=><ServiceCard key={item.id} item={item}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;