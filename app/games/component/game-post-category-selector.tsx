'use client';

import React from 'react';
import { Categories } from "@/constants/categories";
import { CategorySelectProps } from "@/types/Post";

export default function GamePostCategorySelector({ setCategoryAction, exclude = [] }: CategorySelectProps) {
    return (
        <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">카테고리</label>
            <div className="relative">
                <select id="category" onChange={(e) => setCategoryAction(e.target.value)}
                        className="custom-select bg-gray-700 text-gray-200 w-full px-4 py-3 rounded border-none focus:outline-none focus:ring-2 focus:ring-primary pr-10">
                    {Object.entries(Categories).map(([key, label]) => (
                        key !== 'NOTICE' && !exclude.includes(key) ? (
                            <option key={key} value={key}>{label}</option>
                        ) : null
                    ))}
                </select>
            </div>
        </div>
    );
}
