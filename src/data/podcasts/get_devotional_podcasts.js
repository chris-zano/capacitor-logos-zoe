const getDevotionalsPodcasts = async () => {
    const response = await fetch('http://localhost:3123/podcasts/devotionals');
    const data = await response.json();
    return data;
}

export default getDevotionalsPodcasts;