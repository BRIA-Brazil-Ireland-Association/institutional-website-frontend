'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const TITLE = 'Welcome to BRIA';

const useTypewriter = (text: string, speed = 75) => {
	const [displayed, setDisplayed] = useState('');
	const [done, setDone] = useState(false);

	useEffect(() => {
		let i = 0;
		setDisplayed('');
		setDone(false);
		const timer = setInterval(() => {
			i++;
			setDisplayed(text.slice(0, i));
			if (i >= text.length) {
				clearInterval(timer);
				setDone(true);
			}
		}, speed);
		return () => clearInterval(timer);
	}, [text, speed]);

	return { displayed, done };
};

const WavyUnderline = () => (
	<svg
		aria-hidden="true"
		className="absolute -bottom-1.5 left-0 w-full overflow-visible pointer-events-none"
		height="10"
		viewBox="0 0 100 10"
		preserveAspectRatio="none"
	>
		<path
			d="M0 5 C12 1, 25 9, 37 5 C50 1, 62 9, 75 5 C87 1, 95 8, 100 5"
			stroke="var(--color-green-700)"
			strokeWidth="2.5"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const scrollToNext = () => {
	const el = document.getElementById('about');
	if (el) {
		el.scrollIntoView({ behavior: 'smooth' });
	} else {
		window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
	}
};

export default function Hero() {
	const { displayed, done } = useTypewriter(TITLE);

	return (
		<section
			id="home"
			className="relative w-full h-screen min-h-[600px] flex items-center"
		>
			{/* Background */}
			<Image
				src="/assets/hero.png"
				alt="BRIA – Brazil-Ireland Association hero"
				fill
				priority
				className="object-cover object-center"
			/>

			{/* Left fade so text is readable over the image */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />

			{/* Content — left half only */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
				<div className="max-w-lg lg:max-w-xl">
					{/* Typewriter title */}
					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut' }}
						className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-gray-900 leading-tight mb-6"
					>
						{displayed}
						{!done && (
							<span className="inline-block w-0.5 h-[0.85em] bg-gray-900 ml-1 align-middle animate-pulse" />
						)}
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
						className="text-xl sm:text-2xl font-display font-light text-gray-700 leading-relaxed mb-10"
					>
						A bridge between two{' '}
						<span className="relative inline-block pb-1">
							homelands
							<WavyUnderline />
						</span>
						, one community.
					</motion.p>

					{/* CTA */}
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
						onClick={scrollToNext}
						className="group inline-flex items-center gap-2 bg-[var(--color-green-700)] hover:bg-[var(--color-green-900)] text-white font-display font-semibold text-base px-7 py-3.5 rounded-full transition-colors duration-200 animate-float shadow-md hover:shadow-lg"
					>
						Learn More
						<ChevronDown
							size={18}
							className="transition-transform duration-300 group-hover:translate-y-0.5"
						/>
					</motion.button>
				</div>
			</div>
		</section>
	);
}
