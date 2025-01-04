const getVideosByCategoryName = async ({category_name}) => {
    const response = await fetch(`http://localhost:3123/videos/${category_name}`);
    const data = await response.json();
    return data;
}

export default getVideosByCategoryName;