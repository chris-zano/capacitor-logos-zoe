const getDecisions = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/articles/decisions');
    const data = await response.json();
    return data;
}

export default getDecisions;