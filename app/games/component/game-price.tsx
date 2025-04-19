import {Price} from "@/types/Game";
import {apiFetch} from "@/lib/apiFetch";
import * as console from "node:console";
import {ApiResponse} from "@/types/ApiFetch";

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
       <>
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
       </>
    )
}