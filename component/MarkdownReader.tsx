"use client"

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { sanitize } from "isomorphic-dompurify";
import {isValidYouTubeUrl, getYouTubeEmbedUrlWithTime} from "@/lib/utils";

export default function MarkdownReader({ value }: { value: string }) {
    value = sanitize(value, {ALLOWED_TAGS: []});
    return (
        <div className="container">
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }}
                               components={{
                                   img: ({ src, alt }) => {
                                       const isYoutubeAlt = alt === '@youtube';

                                       if (isYoutubeAlt) {
                                           if (src && isValidYouTubeUrl(src)) {
                                               const embedUrl = getYouTubeEmbedUrlWithTime(src);
                                               if (embedUrl) {
                                                   return (
                                                       <div style={{ margin: '1rem 0' }}>
                                                           <iframe
                                                               width="560"
                                                               height="315"
                                                               src={embedUrl}
                                                               title="YouTube Video Preview"
                                                               frameBorder="0"
                                                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                               allowFullScreen
                                                               loading="lazy"
                                                               referrerPolicy="no-referrer"
                                                           />
                                                       </div>
                                                   );
                                               }
                                           }

                                           // 유튜브 alt지만 유효하지 않음 → 아무것도 안 보여줌
                                           return null;
                                       }

                                       // 일반 이미지 처리
                                       return <img src={src} alt={alt} />;
                                   },
                               }} />
        </div>
    );
}