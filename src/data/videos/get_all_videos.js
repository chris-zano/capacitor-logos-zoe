const getAllVideos = async () => {
    const response = await fetch('http://localhost:3123/videos');
    const data = await response.json();
    return data;
}

export default getAllVideos;