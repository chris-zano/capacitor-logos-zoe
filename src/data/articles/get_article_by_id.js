const getArticleById = async (id) => {
    try {
      const response = await fetch(`https://logos-server-j2ld.onrender.com/articles/article/${id}`);
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default getArticleById;
  