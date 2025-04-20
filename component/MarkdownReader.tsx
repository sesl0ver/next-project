"use client"

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { sanitize } from "isomorphic-dompurify";
import {getYouTubeEmbedUrl, isYouTubeLink} from "@/lib/utils";

export default function MarkdownReader({ value }: { value: string }) {
    value = sanitize(value, {ALLOWED_TAGS: []});
    return (
        <div className="container">
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }}
                               components={{
                                   a: ({ href, children }) => {
                                       if (href && isYouTubeLink(href)) {
                                           const embedUrl = getYouTubeEmbedUrl(href);
                                           return embedUrl ? (
                                                   <iframe width="560" height="315"
                                                           src={embedUrl}
                                                           title="YouTube video player" frameBorder="0"
                                                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                           referrerPolicy="strict-origin-when-cross-origin"
                                                           allowFullScreen></iframe>
                                           ) : (
                                               <a href={href}>{children}</a>
                                           );
                                       }
                                       return <a href={href}>{children}</a>;
                                   },
                               }} />
        </div>
    );
}