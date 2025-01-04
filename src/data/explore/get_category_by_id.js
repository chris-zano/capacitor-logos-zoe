const getCategoryById = async (id) => {
    const response = await fetch(`http://localhost:3123/categories/${id}`);
    const data = await response.json();
    return data;
}

export default getCategoryById;