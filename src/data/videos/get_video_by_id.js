const getVideoById = async ({ videoId, category }) => {
    const response = await fetch(`http://localhost:3123/videos/${videoId}/${category}`);
    const data = await response.json();
    return data;
}

export default getVideoById;