const getSearchData = async () => {
    const response = await fetch('http://localhost:3123/data/search/pre-load');
    const data = await response.json();
    return data;
}

export default getSearchData;