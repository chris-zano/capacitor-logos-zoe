import React from "react";

const LoadingSpinner = () => (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999999
    }}>
        <div style={{
            width: "50px",
            height: "50px",
            border: "2px solid rgba(0, 0, 255, 0.3)",
            borderTop: "3px solid blue",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
        }} />
        <br />
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
