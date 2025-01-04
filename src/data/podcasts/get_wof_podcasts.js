const getWofPodcasts = async () => {
    const response = await fetch('http://localhost:3123/podcasts/wof');
    const data = await response.json();
    return data.reverse();
}

export default getWofPodcasts;