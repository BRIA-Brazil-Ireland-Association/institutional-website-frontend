'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const NAV_LINKS = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Inf. Hub', href: '#inf-hub' },
	{ label: 'Team', href: '#team' },
	{ label: 'Events', href: '#events' },
] as const;

const BriaLogo = () => (
	<Link href="/" className="flex items-center shrink-0">
		<Image
			src="/assets/logo.png"
			alt="BRIA – Brazil-Ireland Association"
			width={160}
			height={48}
			className="h-10 w-auto"
			priority
		/>
	</Link>
);

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<header
				className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
					scrolled
						? 'bg-white/95 backdrop-blur-md shadow-sm'
						: 'bg-transparent'
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-16">
					<BriaLogo />

					<nav className="hidden md:flex items-center flex-1 justify-center">
						{NAV_LINKS.map((link, i) => (
							<div key={link.href} className="flex items-center">
								{i > 0 && (
									<span className="text-gray-300 select-none text-sm mx-1">
										|
									</span>
								)}
								<Link
									href={link.href}
									className="text-sm text-gray-700 hover:text-[var(--color-green-700)] px-3 py-2 transition-colors font-display"
								>
									{link.label}
								</Link>
							</div>
						))}
					</nav>

					<div className="ml-auto md:ml-0 flex items-center gap-2">
						<div className="hidden md:block">
							<LanguageSwitcher />
						</div>
						<button
							className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
							onClick={() => setMobileOpen((prev) => !prev)}
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileOpen}
						>
							{mobileOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileOpen ? 'max-h-96' : 'max-h-0'
					}`}
				>
					<div className="bg-white border-t border-gray-100 px-6 py-4">
						<nav className="flex flex-col">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-sm text-gray-700 hover:text-[var(--color-green-700)] py-3 border-b border-gray-50 last:border-0 transition-colors font-display"
									onClick={() => setMobileOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</nav>
						<div className="mt-4 pt-3 border-t border-gray-100">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
