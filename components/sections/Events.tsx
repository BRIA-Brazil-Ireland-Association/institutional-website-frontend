'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EVENTS = [
	{
		day: '30',
		month: 'JUN',
		title: 'Week Career Readiness Program',
		desc: 'This training program offers a comprehensive guide for job seekers navigating the Irish recruitment landscape.',
	},
	{
		day: '12',
		month: 'JUL',
		title: 'Week Career Readiness Program',
		desc: 'This training program offers a comprehensive guide for job seekers navigating the Irish recruitment landscape.',
	},
	{
		day: '8',
		month: 'JUL',
		title: 'Week Career Readiness Program',
		desc: 'This training program offers a comprehensive guide for job seekers navigating the Irish recruitment landscape.',
	},
	{
		day: '29',
		month: 'JUL',
		title: 'Week Career Readiness Program',
		desc: 'This training program offers a comprehensive guide for job seekers navigating the Irish recruitment landscape.',
	},
] as const;

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

const cardStagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const slideLeft = {
	hidden: { opacity: 0, x: -60 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const EventCard = ({ event }: { event: (typeof EVENTS)[number] }) => (
	<motion.div
		variants={cardItem}
		className="flex flex-row items-start gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-sm transition-shadow duration-200"
	>
		{/* Date box */}
		<div className="w-14 shrink-0 bg-[var(--color-green-900)] text-white rounded-lg flex flex-col items-center justify-center py-2">
			<span className="text-xl font-black font-display leading-none">
				{event.day}
			</span>
			<span className="text-[10px] font-display uppercase tracking-wide mt-0.5">
				{event.month}
			</span>
		</div>

		{/* Content */}
		<div className="flex-1 min-w-0">
			<p className="text-sm font-bold font-display text-gray-900 leading-snug">
				{event.title}
			</p>
			<p className="text-xs text-gray-500 mt-1 line-clamp-2">
				{event.desc}
			</p>
		</div>

		{/* Arrow */}
		<ChevronRight
			size={16}
			className="text-gray-400 shrink-0 self-center"
		/>
	</motion.div>
);

export default function Events() {
	return (
		<section id="events" className="w-full overflow-hidden">
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
				{/* ── Left: dark photo column ──────────────────────────── */}
				<motion.div
					variants={slideLeft}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="hidden lg:block lg:w-[45%] min-h-[520px] bg-gray-800"
				>
					{/* Replace with <Image src="..." alt="Events" fill className="object-cover" /> */}
				</motion.div>

				{/* ── Right: event content ─────────────────────────────── */}
				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="w-full lg:w-[55%] bg-white py-16 px-8 lg:px-12 flex flex-col"
				>
					{/* Label */}
					<motion.p
						variants={fadeUp}
						className="text-xs font-display font-extrabold uppercase tracking-widest mb-4"
					>
						<span className="text-[var(--color-blue-900)]">
							EVENTS &amp;{' '}
						</span>
						<span className="text-[var(--color-orange-700)]">
							NETWORKING
						</span>
					</motion.p>

					<motion.h2
						variants={fadeUp}
						className="text-4xl lg:text-5xl font-black font-display text-gray-900 mb-6"
					>
						Up coming Events
					</motion.h2>

					{/* 2×2 grid of event cards */}
					<motion.div
						variants={cardStagger}
						className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1"
					>
						{EVENTS.map((event) => (
							<EventCard
								key={`${event.day}-${event.month}-${event.title}`}
								event={event}
							/>
						))}
					</motion.div>

					{/* Bottom decorative green bar */}
					<motion.div
						variants={fadeUp}
						className="mt-8 h-2 w-full bg-[var(--color-green-700)]"
					/>
				</motion.div>
			</div>
		</section>
	);
}
