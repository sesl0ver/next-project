"use client"

import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { sanitize } from "isomorphic-dompurify";
import {markdownYoutubeComponent} from "@/lib/utils";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownReader({ value }: { value: string }) {
    value = sanitize(value, {ALLOWED_TAGS: []});
    return (
        <div className="container min-h-[200px]">
            <MDEditor.Markdown source={value}
                               style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }}
                               rehypePlugins={[rehypeSanitize]}
                               components={markdownYoutubeComponent} />
        </div>
    );
}