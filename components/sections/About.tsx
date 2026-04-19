'use client';

import { motion } from 'framer-motion';

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const slideLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const slideRight = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function About() {
	return (
		<section
			id="about"
			className="w-full bg-white py-20 px-6 lg:px-8 overflow-hidden"
		>
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
				{/* ── Left: image column ──────────────────────────────── */}
				<motion.div
					variants={slideLeft}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="w-full lg:w-[45%] relative flex-shrink-0"
				>
					{/* Orange rectangle — top-left anchor */}
					<div className="absolute top-0 left-0 w-28 h-16 bg-[var(--color-orange-700)] z-10" />

					{/* Photo placeholder — offset right and down so it overlaps the orange block */}
					<div className="relative mt-6 ml-8 aspect-[4/3] h-80 bg-gray-300 rounded-sm z-20">
						{/* Replace with <Image src="..." alt="About BRIA" fill className="object-cover" /> */}

						{/* Small orange outlined box — bottom-right, partially overlapping */}
						<div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-orange-500 z-30" />
					</div>
				</motion.div>

				{/* ── Right: text column ──────────────────────────────── */}
				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="w-full lg:w-[55%] lg:pl-12 flex flex-col justify-center"
				>
					<motion.p
						variants={fadeUp}
						className="text-xs font-display font-extrabold uppercase tracking-widest text-[var(--color-blue-900)] mb-1"
					>
						BRIA
					</motion.p>

					<motion.h2
						variants={fadeUp}
						className="text-4xl lg:text-5xl font-black font-display text-gray-900 mb-4"
					>
						About us
					</motion.h2>

					<motion.p
						variants={fadeUp}
						className="text-base text-gray-700 leading-relaxed mb-4"
					>
						Our main goal is to assist Brazilian professionals in
						Ireland in overcoming the challenges faced in seeking
						employment, career progression, and integration into the
						Irish job market.
					</motion.p>

					<motion.p
						variants={fadeUp}
						className="text-base text-gray-700 leading-relaxed"
					>
						Our initiative aims to provide a support network,
						resources, and professional development opportunities
						for the Brazilian community, promoting integration and
						strengthening the professional profile.
					</motion.p>

					<motion.button
						variants={fadeUp}
						className="self-start mt-6 px-6 py-2.5 rounded-full bg-[var(--color-orange-700)] hover:bg-[var(--color-orange-500)] text-white font-display font-semibold text-sm transition-colors duration-200"
					>
						Learn More
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
