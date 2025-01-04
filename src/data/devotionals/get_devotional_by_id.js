const getDevotionalById = async (id) => {
    const response = await fetch(`http://localhost:3123/devotionals/devotional/${id}`);
    const data = await response.json();
    return data;
}

export default getDevotionalById;