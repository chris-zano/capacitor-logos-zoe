const getSearchData = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/data/search/pre-load');
    const data = await response.json();
    return data;
}

export default getSearchData;