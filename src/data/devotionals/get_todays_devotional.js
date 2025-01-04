const getTodaysDevotional = async () => {
    const response = await fetch('https://logos-server-j2ld.onrender.com/devotionals/today');
    const data = await response.json();
    return data;
}

export default getTodaysDevotional;