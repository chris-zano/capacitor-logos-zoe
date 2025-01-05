import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/spdd.archives.css";
import getDevotionals from "../../data/devotionals/get_all_devotionals.js";

const Devotionals = () => {
    const [devotionals, setDevotionals] = useState({});

    useEffect(() => {

        const fetchDevotionals = async () => {
            const data = await getDevotionals();
            setDevotionals(data);
        };
        fetchDevotionals();
    }, []);


    if (!devotionals) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header>
                <div id="read-appbar">
                    <div className="row">
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <h2
                            className="article_title-p"
                            style={{
                                fontSize: "1.2rem",
                                color: "var(--white)",
                                marginLeft: 0,
                            }}
                        >
                            {`Scepter Of Power Daily Devotionals`.substring(0, 15) + " ... Archives"}
                        </h2>
                    </div>
                </div>
            </header>

            <main>

                <section className="year-section">
                    <ul>
                        {Array.from(devotionals).reverse().map((devotional, index) => (
                            <li key={index}>
                                <a href={`/devotionals/devotional/${devotional._id}`}>
                                    <img
                                        src={devotional.theme_picture_url}
                                        alt="Devotional Image"
                                    />
                                    <div>
                                        <p>{`${devotional.day} ${devotional.month} ${devotional.year}`}</p>
                                        <button>Read It</button>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Devotionals;
