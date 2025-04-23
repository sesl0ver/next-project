"use client"

import {RiCheckboxCircleLine, RiInformationLine} from '@remixicon/react';

export default function GamePostGuide() {
    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-white font-medium mb-4 flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2 text-yellow-500">
                    <RiInformationLine />
                </div>
                게시글 작성 가이드
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                        <RiCheckboxCircleLine />
                    </div>
                    <p>타인에게 불쾌감을 주는 내용이나 욕설, 비방 등은 삼가해 주세요.</p>
                </li>
                <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                        <RiCheckboxCircleLine />
                    </div>
                    <p>개인정보 보호를 위해 실명, 전화번호, 주소 등의 개인정보 공유는 자제해 주세요.</p>
                </li>
                <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                        <RiCheckboxCircleLine />
                    </div>
                    <p>저작권에 문제가 될 수 있는 자료의 무단 공유는 금지됩니다.</p>
                </li>
                <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                        <RiCheckboxCircleLine />
                    </div>
                    <p>게시글 작성 후에도 수정 및 삭제가 가능합니다.</p>
                </li>
            </ul>
        </div>
    )
}