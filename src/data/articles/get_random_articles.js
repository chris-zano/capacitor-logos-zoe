const getRecommendedArticles = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/articles/recommended');
    const data = await response.json();
    return data;
}

export default getRecommendedArticles;