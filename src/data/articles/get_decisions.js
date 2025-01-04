const getDecisions = async () => {
    const response = await fetch('http://localhost:3123/articles/decisions');
    const data = await response.json();
    return data;
}

export default getDecisions;