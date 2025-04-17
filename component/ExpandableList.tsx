"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableListProps {
    items: string[] | Element[] | React.ReactNode[];
    step?: number;
}

export function ExpandableList({ items, step = 2 }: ExpandableListProps) {
    const [visibleCount, setVisibleCount] = useState(step);

    const showMore = () => {
        setVisibleCount((prev) => Math.min(prev + step, items.length));
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-2 w-full">
                <AnimatePresence initial={false}>
                    {items.slice(0, visibleCount).map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                            {item}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {visibleCount < items.length && (
                <motion.button onClick={showMore}
                    className="px-4 py-2 my-2 text-white text-sm bg-blue-700 hover:bg-blue-800 rounded w-full"
                    whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
                    더 보기
                </motion.button>
            )}
        </div>
    );
}
