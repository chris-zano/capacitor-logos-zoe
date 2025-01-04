const getDevotionalsPodcasts = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/podcasts/devotionals');
    const data = await response.json();
    return data;
}

export default getDevotionalsPodcasts;