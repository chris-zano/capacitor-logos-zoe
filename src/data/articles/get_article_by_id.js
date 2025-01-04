const getArticleById = async () => {
    const response = await fetch(`https://logos-server-j2ld.onrender.com/articles/article/${id}`);
    const data = await response.json();
    return data;
}

export default getArticleById;