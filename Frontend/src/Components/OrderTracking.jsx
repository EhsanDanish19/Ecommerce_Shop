import React from "react";

const steps = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED"
];

const OrderTracking = ({ status }) => {

    const currentStep = steps.indexOf(status);

    return (
        <div className="flex flex-col items-center">

            <span
                className={`font-semibold text-sm mb-2
                    ${
                        status === "DELIVERED"
                            ? "text-green-600"
                            : status === "SHIPPED"
                            ? "text-blue-600"
                            : status === "CONFIRMED"
                            ? "text-orange-500"
                            : "text-gray-600"
                    }`}
            >
                {status}
            </span>

            <div className="flex items-center">

                {steps.map((step, index) => (

                    <React.Fragment key={step}>

                        <div
                            className={`w-4 h-4 rounded-full
                                ${
                                    index <= currentStep
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                }`}
                        ></div>

                        {index !== steps.length - 1 && (

                            <div
                                className={`w-4 lg:w-8 h-1
                                    ${
                                        index < currentStep
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                            ></div>

                        )}

                    </React.Fragment>

                ))}

            </div>

        </div>
    );
};

export default OrderTracking;