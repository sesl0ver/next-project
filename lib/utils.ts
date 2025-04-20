export function isYouTubeLink(href: string) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(href);
}

export function getYouTubeEmbedUrl(url: string) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}