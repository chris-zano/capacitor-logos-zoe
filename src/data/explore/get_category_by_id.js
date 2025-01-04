const getCategoryById = async (id) => {
    const response = await fetch(`https://logos-server-j2ld.onrender.com/categories/${id}`);
    const data = await response.json();
    return data;
}

export default getCategoryById;