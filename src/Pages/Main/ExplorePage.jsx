import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCategories from '../../data/explore/get_categories.js';
import '../../styles/explore.css';

const ExplorePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data.categories);
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <div className="explore-title">
                <h2 className="section-title">Explore</h2>
            </div>
            <div id="explore-grid" className="explore-grid">
                {categories.map((category, index) => {
                    const isSpecialCategory = category.category_name === 'Jesus Talk' || category.category_name === 'Spiritual Laws';
                    const animationDelay = `${index * 0.2}s`;

                    return (
                        <div
                            key={category._id}
                            className="grid-card"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${animationDelay} forwards`,
                            }}
                            data-url={`/categories/${category._id}`}
                        >
                            <a href={isSpecialCategory ? `/categories/chapters/${category._id}` : `/categories/${category._id}`}>
                                <div className="card-icon">
                                    <FontAwesomeIcon
                                        icon={category.category_icon}  // Directly pass icon name as a variable
                                        style={{ color: category.color }}
                                    />
                                </div>
                                <div className="card-title">
                                    <p>{category.category_name}</p>
                                </div>
                                <div className="card-description">
                                    <p>{category.description}</p>
                                </div>
                            </a>
                        </div>
                    );
                })}
                {/* Additional grid cards for Prayer Center and Devotionals */}
            </div>
        </div>
    );
};

export default ExplorePage;
