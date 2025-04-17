import Link from "next/link";
import { RiTwitterXLine, RiFacebookLine, RiInstagramLine, RiAppleFill, RiGooglePlayFill } from "@remixicon/react";


const LinkItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <li>
            <Link href={href} className="hover:text-indigo-300">
                {children}
            </Link>
        </li>
    );
};

const LinkIcon = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Link href={href} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-500">
            {children}
        </Link>
    );
};


export default function Footer() {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">서비스 정보</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <LinkItem href="#">이용약관</LinkItem>
                            <LinkItem href="#">개인정보처리방침</LinkItem>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">고객센터</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <LinkItem href="#">문의하기</LinkItem>
                            <LinkItem href="#">FAQ</LinkItem>
                            <LinkItem href="#">공지사항</LinkItem>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">소셜 미디어</h3>
                        <div className="flex space-x-4">
                            <LinkIcon href="#"><RiTwitterXLine /></LinkIcon>
                            <LinkIcon href="#"><RiFacebookLine /></LinkIcon>
                            <LinkIcon href="#"><RiInstagramLine /></LinkIcon>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">모바일 앱</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="flex items-center justify-center px-4 py-2 bg-gray-900 rounded">
                                <RiAppleFill />
                                <span className="text-sm">App Store</span>
                            </Link>
                            <Link href="#" className="flex items-center justify-center px-4 py-2 bg-green-600 rounded">
                                <RiGooglePlayFill />
                                <span className="text-sm">Play Store</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
                    © 2025 아무개 커뮤니티. All rights reserved.
                </div>
            </div>
        </footer>
    )
}