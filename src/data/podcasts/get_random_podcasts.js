const getRandomPodcasts = async () => {
    const response = await fetch('http://localhost:3123/podcasts/random');
    const data = await response.json();
    return data;
}

export default getRandomPodcasts;