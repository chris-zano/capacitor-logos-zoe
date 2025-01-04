const getSymbols = async () => {
    const response = await fetch('http://localhost:3123/articles/symbols');
    const data = await response.json();
    return data;
}

export default getSymbols;