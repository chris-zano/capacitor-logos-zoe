const getCategories = async () => {
    const response = await fetch('http://localhost:3123/categories');
    const data = await response.json();
    return data;
}

export default getCategories;