import {Price} from "@/types/Game";
import {apiFetch} from "@/lib/apiFetch";
import React from "react";

async function getPrice (id: string): Promise<Price> {
    return apiFetch(`${process.env.API_URL}/games/price/${id}`, { cache: 'force-cache', next: { revalidate: 86400 } });
}

export default async function GamePrice(params: { id: string }) {
    const data: Price = await getPrice(params['id']);
    const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-4">스팀 상점 가격 정보</h3>
            <div className="space-y-2 text-sm">
                {
                    (data?.regularPrice || data?.currentPrice || data?.lowPrice) ? (
                        <>
                            <div className="flex justify-between">
                                <span>게임 정가</span>
                                <span>{formatter.format(data.regularPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>현재 가격</span>
                                <span>{formatter.format(data.currentPrice)} {(data.cut > 0) ? ` (-${data.cut}%)` : null}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>역대 최저가</span>
                                <span>{formatter.format(data.lowPrice)} {(data.lowCut > 0) ? ` (-${data.lowCut}%)` : null}</span>
                            </div>
                        </>
                    ) : '가격 정보가 없습니다.'
                }
            </div>
        </div>
    )
}