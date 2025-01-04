const getVideoById = async ({ videoId, category }) => {
    const response = await fetch(`https://logos-server-j2ld.onrender.com/videos/${videoId}/${category}`);
    const data = await response.json();
    return data;
}

export default getVideoById;