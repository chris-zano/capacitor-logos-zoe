const getAllDevotionals = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/devotionals');
    const data = await response.json();
    return data;
}

export default getAllDevotionals;