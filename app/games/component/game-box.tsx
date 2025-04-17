import Link from "next/link";
import {Game} from "@/types/Game";
import { RiHeartLine } from '@remixicon/react';

export default function GameBox({ game }: { game: Game }) {
    const { app_id, header_image, title, genres, developers, release_date } = game;
    return (
        <div className="bg-gray-700 rounded-lg overflow-hidden group">
            <div className="aspect-video relative">
                <img loading="lazy" src={header_image} alt={title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 duration-250 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-2 overflow-hidden overflow-ellipsis">
                            {
                                genres.map((genre: string, idx: number) => {
                                    return (
                                        <span key={idx} className="px-2 py-1 bg-blue-600 text-xs rounded-full overflow-hidden overflow-ellipsis text-nowrap max-w-[76px]" title={genre}>{ genre }</span>
                                    )
                                })
                            }
                        </div>
                        <div className="flex items-center space-x-2">
                            {
                                developers.map((dev: string, idx: number) => {
                                    return (
                                        <p key={idx} className="px-3 py-1 bg-gray-800 bg-opacity-20 text-indigo-300 rounded-full text-xs whitespace-nowrap">
                                            { dev }
                                        </p>
                                    )
                                })
                            }
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:text-pink-400">
                                <RiHeartLine />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold overflow-hidden overflow-ellipsis text-nowrap" title={title}>{title}</h3>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{release_date} 출시</span>
                    <Link href={`/games/${app_id}`} className="px-3 py-1 bg-gray-800 bg-opacity-20 text-indigo-300 rounded-full text-xs whitespace-nowrap">상세보기</Link>
                </div>
            </div>
        </div>
    )
}