import React from "react";

const LoadingSpinner = () => (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: '4rem',
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(255, 255, 255)",
        zIndex: 99999,
        flexDirection: "column",
        gap: "1ch",
        padding: "1ch 1ch 1ch 0"
    }}>
        {/* Skeleton loader cards */}
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginInline: "auto",
            gap: "10px",
            width: "90%",
        }}>
            {/* Video card skeleton */}
            {[...Array(3)].map((_, index) => (
                <div key={index} style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    {/* Thumbnail loader */}
                    <div style={{
                        width: "100%",
                        height: "180px",
                        backgroundColor: "#d0d0d0",
                        animation: "pulse 1.5s infinite ease-in-out"
                    }} />
                    {/* Text loader */}
                    <div style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                    }}>
                        <div style={{
                            height: "20px",
                            backgroundColor: "#d0d0d0",
                            borderRadius: "4px",
                            animation: "pulse 1.5s infinite ease-in-out"
                        }} />
                        <div style={{
                            height: "15px",
                            backgroundColor: "#d0d0d0",
                            borderRadius: "4px",
                            animation: "pulse 1.5s infinite ease-in-out"
                        }} />
                    </div>
                </div>
            ))}
        </div>
        
        <style>
            {`
                @keyframes pulse {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
            `}
        </style>
    </div>
);

export default LoadingSpinner;
