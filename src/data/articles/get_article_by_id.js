const getArticleById = async () => {
    const response = await fetch(`http://localhost:3123/articles/article/${id}`);
    const data = await response.json();
    return data;
}

export default getArticleById;