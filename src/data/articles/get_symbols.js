const getSymbols = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/articles/symbols');
    const data = await response.json();
    return data;
}

export default getSymbols;