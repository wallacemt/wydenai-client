import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const Popup = ({ message, type, onClose, duration = 5000 }) => {
    const [timeLeft, setTimeLeft] = useState(duration / 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [duration, onClose]);

    useEffect(() => {
        Aos.init({
            duration: 2500,
            easing: "ease-in-out",
        });
    }, []);
    return (
        <div className="fixed top-0 right-0 z-50 p-4" data-aos="fade-in">
            <div
                className={`p-4 rounded-lg shadow-lg text-white ${
                    type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            >
                <p>{message}</p>
                <p className="text-sm">
                    Close in {timeLeft}s
                </p>
                <button className="mt-2 text-white underline" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default Popup;
