import React, { useRef, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";

function PrivacyPolicyComponent() {
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleLinkClick = (event) => {
            if (!iframeRef.current) return;
            const iframe = iframeRef.current;

            try {
                const links = iframe.contentDocument.querySelectorAll("a");

                links.forEach((link) => {
                    link.addEventListener("click", (e) => {
                        const url = link.getAttribute("href");

                        // Ignore in-page navigation (#) and internal links
                        if (!url || url.startsWith("#") || url.startsWith("/privacy") || url.includes(window.location.origin)) {
                            return;
                        }

                        console.log("Opening external link:", url);
                        e.preventDefault();

                        if (Capacitor.isNativePlatform()) {
                            Browser.open({ url }); // Opens in external browser
                        } else {
                            window.open(url, "_blank"); // Opens in a new tab
                        }
                    });
                });
            } catch (error) {
                console.warn("Cannot access iframe content due to cross-origin restrictions.");
            }
        };

        // Wait for the iframe to load and then attach the event listener
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener("load", handleLinkClick);
        }

        return () => {
            if (iframe) {
                iframe.removeEventListener("load", handleLinkClick);
            }
        };
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                ref={iframeRef}
                src="/privacy-policy.html"
                title="Privacy Policy"
                style={{ width: "100%", height: "100%", border: "none" }}
            />
        </div>
    );
}

export default PrivacyPolicyComponent;
