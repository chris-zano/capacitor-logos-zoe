const getRecommendedArticles = async () => {
    const response = await fetch('http://localhost:3123/articles/recommended');
    const data = await response.json();
    return data;
}

export default getRecommendedArticles;