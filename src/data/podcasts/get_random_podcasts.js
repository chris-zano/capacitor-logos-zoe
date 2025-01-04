const getRandomPodcasts = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/random');
    const data = await response.json();
    return data;
}

export default getRandomPodcasts;