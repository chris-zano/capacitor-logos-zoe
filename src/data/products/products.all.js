const getProducts = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/products');
    const data = await response.json();
    return data;
}

export default getProducts;