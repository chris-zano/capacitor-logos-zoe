// helpers/youtubeUtils.js
export function extractVideoId(url) {
    const regex = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export function formatDuration(isoDuration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = isoDuration.match(regex);
    if (!match) return 'Unknown';

    const hours = match[1] ? `${match[1]}h ` : '';
    const minutes = match[2] ? `${match[2]}m ` : '';
    const seconds = match[3] ? `${match[3]}s` : '';
    return `${hours}${minutes}${seconds}`.trim();
}

export function parseDurationToString(durationArray) {
    const [hours, minutes, seconds] = durationArray.map(Number);
    let durationString = '';

    if (hours) {
        durationString += `${hours}:`;
    }
    if (minutes) {

        durationString += `${String(minutes).padStart(2, "0")}:`;
    }
    if (seconds) {
        durationString += `${seconds}`;
    }

    durationString = durationString.replace(/:$/, '');

    return durationString.trim();
}

export async function fetchYouTubeVideoDetails(url) {
    // const videoId = extractVideoId(url);
    const videoId = url;
    const _apiKey = "AIzaSyBJEV9SWRap4qCr8lgHHL5Yq0VJw9Fgs64";
    if (!videoId) throw new Error("Invalid YouTube URL");

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${_apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error("Video not found or API error");
    }

    const video = data.items[0];
    return {
        title: video.snippet.title,
        description: video.snippet.description,
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        duration: parseDurationToString(formatDuration(video.contentDetails.duration)
            .replace("h", "")
            .replace("m", "")
            .replace("s", "")
            .split(" ")),
        videoId
    };
}
