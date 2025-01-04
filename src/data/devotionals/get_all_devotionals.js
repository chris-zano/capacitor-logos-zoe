const getAllDevotionals = async () => {
    const response = await fetch('http://localhost:3123/devotionals');
    const data = await response.json();
    return data;
}

export default getAllDevotionals;