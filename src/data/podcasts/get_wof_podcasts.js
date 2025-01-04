const getWofPodcasts = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/wof');
    const data = await response.json();
    return data.reverse();
}

export default getWofPodcasts;