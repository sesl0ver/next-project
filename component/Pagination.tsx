'use client'

import {useRouter} from "next/navigation";
import {RiSkipLeftLine, RiArrowLeftDoubleLine, RiArrowLeftSLine, RiSkipRightLine, RiArrowRightDoubleLine, RiArrowRightSLine} from "@remixicon/react";
import {GamePage} from "@/types/Game";
import {PostPage} from "@/types/Post";


export default function Pagination({ data }: { data: GamePage | PostPage }) {
    const router = useRouter();
    const { totalCount, totalPages, pageSize, currentPage } = data;
    const groupSize = 10;

    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const groupStart = currentGroup * groupSize + 1;
    const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

    const goToPage = (page: number) => {
        router.push(`?page=${page}`);
    };
    return (
        <div className="flex justify-center">
            <div className="flex items-center space-x-2">
                <button onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 cursor-pointer">
                    <RiSkipLeftLine />
                </button>
                <button onClick={() => goToPage(Math.max(1, groupStart - groupSize))}
                        disabled={currentPage <= groupSize}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 cursor-pointer">
                    <RiArrowLeftDoubleLine />
                </button>

                {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => {
                    const pageNum = groupStart + i;
                    return (
                        <button key={pageNum} onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                                pageNum === currentPage ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                            }`}>
                            {pageNum}
                        </button>
                    );
                })}

                <button onClick={() => goToPage(Math.min(totalPages, groupStart + groupSize))}
                        disabled={groupEnd === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 cursor-pointer">
                    <RiArrowRightDoubleLine />
                </button>
                <button onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 cursor-pointer">
                    <RiSkipRightLine />
                </button>
            </div>
        </div>
    )
}