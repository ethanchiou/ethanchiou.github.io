import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="w-full p-4 border-b border-[rgba(0,240,255,0.2)] bg-[#0a0a0a]/80 backdrop-blur-md fixed top-0 z-50">
            <div className="w-full px-8 flex justify-between items-center">
                <Link href="/" className="block relative w-48 h-16">
                    <Image
                        src="/images/logo_ethanchiou_cursive.png"
                        alt="EthanChiou Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>
                <div className="flex gap-8 mr-4">
                    <Link href="/" className="hover:text-[#00f0ff] transition-colors">
                        HOME
                    </Link>
                    <Link href="/projects" className="hover:text-[#00f0ff] transition-colors">
                        PROJECTS
                    </Link>
                    <Link href="/experience" className="hover:text-[#00f0ff] transition-colors">
                        EXPERIENCE
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
