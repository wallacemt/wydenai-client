import React from "react";
import { PushSpinner as PulseSpinner } from "react-spinners-kit";

const LoadingSpinner = ({ size = 30, color = "#FF2A00", message = "Carregando..." }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <PulseSpinner size={size} color={color} />
            {message && <p className="text-sm text-gray-500">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
