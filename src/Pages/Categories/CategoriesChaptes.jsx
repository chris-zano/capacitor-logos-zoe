import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import getCategoryById from "../../data/explore/get_category_by_id";

const CategoryChapter = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the `id` from the route params
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const data = await getCategoryById(id);
                
                setCategory(data);
                setTitle(data.categoryInfo.category_name);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <header>
            <div id="read-appbar">
                    <div className="row" style={{display:'flex', justifyContent: 'space-between', padding: '0 3ch 0 1ch'}}>
                        <button onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
            </header>

            <main id="cat-chapters">
                <ul>
                    {category.articles.map((article) => (
                        <li key={article._id}>
                            <img src={article.article_image} alt="Devotional" />
                            <div>
                                <span>
                                    {article.article_title.length > 25 ? article.article_title.substring(0, 25) + '...': article.article_title}
                                </span>
                                <br />
                                <Link to={`/articles/article/${article._id}`}>Read It</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default CategoryChapter;
