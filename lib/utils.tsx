import React, { HTMLAttributes, ReactNode } from 'react';
import {commands} from "@uiw/react-md-editor";
import {RiYoutubeFill} from "@remixicon/react";

// blockquote props 타입
interface BlockquoteProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}

function isValidYouTubeUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname.toLowerCase();

        // 허용된 도메인만 통과
        const whitelist = ['www.youtube.com', 'youtube.com', 'youtu.be'];
        return whitelist.includes(hostname);
    } catch {
        return false;
    }
}

function getYouTubeEmbedUrlWithTime(url: string): string | null {
    try {
        const parsed = new URL(url);

        let videoId: string | null = null;
        let startTime: string | null = null;

        // youtu.be 형식 처리
        if (parsed.hostname === 'youtu.be') {
            videoId = parsed.pathname.slice(1); // /VIDEO_ID
            startTime = parsed.searchParams.get('t'); // "53", "1m30s" 등
        }

        // youtube.com 형식 처리
        if (parsed.hostname.includes('youtube.com')) {
            if (parsed.pathname.startsWith('/shorts')) {
                videoId = parsed.pathname.split('/').pop() ?? null;
            } else {
                videoId = parsed.searchParams.get('v');
                startTime = parsed.searchParams.get('t');
            }
        }

        if (!videoId || !isValidYouTubeVideoId(videoId)) return null;

        const base = `https://www.youtube.com/embed/${videoId}`;
        const query = new URLSearchParams();

        if (startTime) {
            const seconds = convertTimestampToSeconds(startTime);
            if (seconds) query.set('start', seconds.toString());
        }

        return `${base}${query.toString() ? `?${query.toString()}` : ''}`;
    } catch {
        return null;
    }
}



function isValidYouTubeVideoId(id: string | null): boolean {
    return !!id && /^[0-9A-Za-z_-]{11}$/.test(id);
}

function convertTimestampToSeconds(t: string): number | null {
    if (/^\d+$/.test(t)) {
        return parseInt(t, 10); // "53"
    }

    const match = t.match(/(?:(\d+)m)?(?:(\d+)s)?/);
    if (!match) return null;

    const minutes = parseInt(match[1] || '0', 10);
    const seconds = parseInt(match[2] || '0', 10);
    return minutes * 60 + seconds;
}

export const markdownYoutubeComponent = {
    img: ({ src, alt }) => {
        const isYoutubeAlt = alt === '@youtube';
        if (isYoutubeAlt) {
            if (src && isValidYouTubeUrl(src)) {
                const embedUrl = getYouTubeEmbedUrlWithTime(src);
                if (embedUrl) {
                    return (
                        <div style={{ margin: '1rem 0' }}>
                            <iframe width="560" height="315" src={embedUrl} title="YouTube Video Preview" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer" />
                        </div>
                    );
                }
            }
            return null;
        }

        // 일반 이미지 처리
        return <img src={src} alt={alt} />;
    },
}

const commandsYoutube = {
    name: 'Youtube',
    keyCommand: 'youtube',
    buttonProps: { 'aria-label': 'Insert Youtube Video.' },
    icon: (
        <RiYoutubeFill size={15} style={{ margin:'-7px -3px' }} />
    ),
    execute: (state, api) => {
        let youtubeLink = `![@youtube](${state.selectedText}\n`;
        if (!state.selectedText) {
            youtubeLink = `![@youtube](URL)\n`;
        }
        api.replaceSelection(youtubeLink);
    },
};

export const markdownToolbarCommands = [
    commands.bold, commands.italic, commands.strikethrough, commands.hr, commands.title,
    commands.divider,
    commands.link, commands.quote, commands.code, commands.codeBlock, commands.comment,
    commands.image, commandsYoutube, commands.table,
    commands.divider,
    commands.unorderedListCommand, commands.orderedListCommand, commands.checkedListCommand,
    commands.divider,
    commands.help,
]
