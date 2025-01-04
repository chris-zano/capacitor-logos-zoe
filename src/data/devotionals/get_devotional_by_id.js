const getDevotionalById = async (id) => {
    const response = await fetch(`https://logos-server-j2ld.onrender.com/devotionals/devotional/${id}`);
    const data = await response.json();
    return data;
}

export default getDevotionalById;