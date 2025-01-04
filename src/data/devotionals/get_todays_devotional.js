const getTodaysDevotional = async () => {
    const response = await fetch('http://localhost:3123/devotionals/today');
    const data = await response.json();
    return data;
}

export default getTodaysDevotional;