import React, { useEffect, useState } from 'react';
import getVideosByCategoryName from '../../data/videos/get_videos_by_category_name.js';

const TestimoniesComponent = () => {
    const [testimonies, setTestimonies] = useState([]);


    useEffect(() => {
        const fetchTestimonies = async () => {
            const data = await getVideosByCategoryName({ category_name: 'testimony-of-jesus' });
            setTestimonies(data.slice(0, 5));
        };

        fetchTestimonies();
    }, []);


    if (!testimonies || testimonies.length === 0) {
        return null;
    }

    return (
        <div className="testimony-list">
            <div className="testimony-header">
                <h2 className="section-title">Testimonies of Jesus Christ</h2>
            </div>

            {testimonies.map((testimony) => (
                <a key={testimony._id} className="testimonial-card">
                    <div id={testimony._id} className="testimony-item">
                        <div className="p-image">
                            <img src={testimony.video_image} alt={testimony.video_title} />
                        </div>
                        <div className="testimony-details">
                            <div className="p-title">
                                <p>{testimony.video_title}</p>
                            </div>
                            <div className="p-description">
                                <p>Testimonies of Jesus Christ</p>
                            </div>
                        </div>
                        <div className="testimony-play-icon">
                            <span>
                                <i className="fa-regular fa-circle-play"></i>
                            </span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default TestimoniesComponent;
