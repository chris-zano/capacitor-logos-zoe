import React from "react";

const LoadingSpinner = () => (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999
    }}>
        <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid rgba(0, 0, 255, 0.3)",
            borderTop: "5px solid blue",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
        }} />
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
    </div>
);

export default LoadingSpinner;
