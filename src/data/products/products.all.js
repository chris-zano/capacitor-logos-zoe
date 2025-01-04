const getProducts = async () => {
    const response = await fetch('http://localhost:3123/products');
    const data = await response.json();
    return data;
}

export default getProducts;