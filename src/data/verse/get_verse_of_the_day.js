export const GetDailyVerse = async () => {
  const key = 'dailyVerse';
  const cachedData = localStorage.getItem(key);
  const today = new Date().toISOString().split('T')[0];

  try {
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);


      if (timestamp === today) {
        return data;
      }
    }


    const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const res = await fetch(url, options);
    const json = await res.json();

    const { verse } = json;
    const { reference, text, version, verseurl } = verse.details;
    const { notice } = verse;

    const data = { reference, text, version, verseurl, notice };


    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: today,
      })
    );

    return data;
  } catch (err) {
    console.error("Failed to fetch daily verse:", err);
    throw err;
  }
};