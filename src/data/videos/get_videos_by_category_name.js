const getVideosByCategoryName = async ({category_name}) => {
    const response = await fetch(`https://logos-server-j2ld.onrender.com/videos/${category_name}`);
    const data = await response.json();
    return data;
}

export default getVideosByCategoryName;