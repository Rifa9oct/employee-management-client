import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from "axios";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import SectionTitle from "../../Shared/SectionTitle/SectionTitle"



const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios("https://employee-management-server-omega.vercel.app/reviews")
            .then(res => setReviews(res.data))
    }, [])

    return (
        <div className="my-20">
            <SectionTitle
            heading="TESTIMONIALS"
            subTitle="Reviews"
            ></SectionTitle>
            <Swiper spaceBetween={30} centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="lg:w-[1200px] lg:h-[400px] bg-blue-100 rounded mx-auto mt-5">
                            <div className="flex justify-around items-center">
                                <div className="py-12 pl-12">
                                    <img className="w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] rounded-full" src={review.img} />
                                </div>
                                <div className="w-2/4">
                                    <p className="text-slate-500 text-sm lg:text-base">{review.description}</p>
                                    <Rating
                                        className="mt-3"
                                        style={{ maxWidth: 120 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                    <h1 className="text-2xl font-bold text-purple-500">{review.name}</h1>
                                    <h3 className="font-bold">{review.role}</h3>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
};

export default Testimonials;