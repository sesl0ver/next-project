"use client"

import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function MarkdownReader({ value }: { value: string }) {
    return (
        <div className="container">
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }} />
        </div>
    );
}