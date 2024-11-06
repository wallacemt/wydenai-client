import React, { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
const BannerLateral = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out'
        })
    }, []);

    return (
        <div className="w-[70vw] h-screen bg-[#AB227D] overflow-hidden">
            <div
                className="bg-[url('/ilustration.png')] bg-no-repeat bg-center bg-cover h-[100%] w-[100%] "
                data-aos = 'slide-down'
            ></div>
        </div>

    )
};


export default BannerLateral;
