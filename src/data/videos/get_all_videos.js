const getAllVideos = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/videos');
    const data = await response.json();
    return data;
}

export default getAllVideos;