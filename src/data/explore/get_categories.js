const getCategories = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/categories');
    const data = await response.json();
    return data;
}

export default getCategories;