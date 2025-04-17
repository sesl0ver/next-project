"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    description: string;
}

const NavItems: NavItem[] = [
    { href: "/", description: "Home" },
    { href: "/games", description: "Game" },
    { href: "#", description: "Menu01" },
    { href: "#", description: "Menu02" },
    { href: "#", description: "Menu03" },
    { href: "#", description: "Menu04" },
];

const NavItem = ({ href, children, selected }: { href: string, children: React.ReactNode, selected?: string }) => {
    return (
        <li>
            <Link href={href} className={`text-gray-300 hover:!text-blue-500 ${selected}`}>
                {children}
            </Link>
        </li>
    );
};

export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav className="md:flex hidden space-x-8 h-12 items-center text-sm list-none">
            <ul className="flex space-x-8">
                {
                    NavItems.map(({ href, description }: NavItem, idx: number) => {
                        return <NavItem key={idx} href={href} selected={(href === pathname) ? `!text-blue-300` : null}>{ description }</NavItem>
                    })
                }
            </ul>
        </nav>
    )
}