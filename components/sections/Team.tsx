'use client';

import { motion } from 'framer-motion';

const MEMBER_COUNT = 4;

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const photoStagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const photoItem = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const slideLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const slideRight = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function Team() {
	return (
		<section
			id="team"
			className="w-full bg-[var(--color-blue-100)] overflow-hidden"
		>
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
				{/* ── Left: text panel ────────────────────────────────── */}
				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="w-full lg:w-[55%] bg-white py-16 px-10 flex flex-col justify-center"
				>
					<motion.p
						variants={fadeUp}
						className="text-xs font-display font-extrabold uppercase tracking-widest text-[var(--color-orange-700)] mb-3"
					>
						TEAM
					</motion.p>

					<motion.h2
						variants={fadeUp}
						className="text-4xl lg:text-5xl font-black font-display text-gray-900 leading-tight"
					>
						Join us and be part of this team!
					</motion.h2>

					<motion.p
						variants={fadeUp}
						className="text-sm text-gray-600 mt-3 leading-relaxed max-w-md"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed enim sem, consectetur a felis ac, mollis
						pellentesque diam.
					</motion.p>

					<motion.button
						variants={fadeUp}
						className="self-start mt-4 px-5 py-2 rounded-full bg-[var(--color-green-700)] hover:bg-[var(--color-green-900)] text-white font-display font-semibold text-sm transition-colors duration-200"
					>
						Learn more
					</motion.button>

					{/* Team member photo placeholders */}
					<motion.div
						variants={photoStagger}
						className="flex flex-row gap-3 mt-8"
					>
						{Array.from({ length: MEMBER_COUNT }).map((_, i) => (
							<motion.div
								key={i}
								variants={photoItem}
								className="w-16 h-16 rounded-xl bg-gray-300 shrink-0"
							>
								{/* Replace with <Image src="..." alt="Team member" width={64} height={64} className="rounded-xl object-cover" /> */}
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* ── Right: photo column ──────────────────────────────── */}
				<motion.div
					variants={slideRight}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="w-full lg:w-[45%] relative min-h-[360px] lg:min-h-full"
				>
					{/* Full-height photo placeholder */}
					<div className="absolute inset-0 bg-gray-400">
						{/* Replace with <Image src="..." alt="Team photo" fill className="object-cover" /> */}
					</div>

					{/* Dark green decorative square — bottom-right corner */}
					<div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--color-green-900)] z-10" />
				</motion.div>
			</div>
		</section>
	);
}
