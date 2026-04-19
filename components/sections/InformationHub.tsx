'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

import HUB_ICONS, { type HubIconKey } from '@/components/ui/hubIcons';

const HUB_ITEMS: { key: HubIconKey; title: string; description: string }[] = [
	{
		key: 'work',
		title: 'Work and Professional Development',
		description:
			'Find information regarding professional development and working opportunities, such as Networking Strategies, Overview of Irish Job Market, Workplace Culture in Ireland, etc.',
	},
	{
		key: 'legal',
		title: 'Legal and Immigration Support',
		description:
			'Learn more about your rights and duties as an immigrant. Read about Visa Requirements, Social Security, Taxation, etc.',
	},
	{
		key: 'culture',
		title: 'Culture',
		description:
			"Explore information on Irish Culture, including traditions, social customs and festivals that shapes Ireland's cultural identity.",
	},
	{
		key: 'courses',
		title: 'Free courses and education',
		description:
			'Discover resources on Free Courses and Education Opportunities in Ireland, highlighting available programs, institutions offering free learning, and how to access these educational resources.',
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeOut' as const },
	},
};

const stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const cardFadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' as const },
	},
};

const HubCard = ({ item }: { item: (typeof HUB_ITEMS)[number] }) => {
	const Icon = HUB_ICONS[item.key];

	return (
		<motion.div
			variants={cardFadeUp}
			className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#C2F772] hover:-translate-y-1 hover:shadow-xl transition-[box-shadow,transform] duration-200"
		>
			{/* Dark right accent bar */}
			<div className="absolute right-0 top-0 bottom-0 w-3 bg-gray-900" />

			<div className="flex flex-col h-full p-7 pr-10">
				{/* Icon */}
				<div className="text-gray-900 mb-5">
					<Icon size={48} />
				</div>

				{/* Title */}
				<h3 className="text-base font-black font-display text-gray-900 leading-snug mb-3">
					{item.title}
				</h3>

				{/* Description */}
				<p className="text-xs text-gray-800 leading-relaxed flex-1">
					{item.description}
				</p>

				{/* CTA */}
				<button className="self-start mt-6 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-display font-semibold text-xs px-5 py-2.5 rounded-full transition-colors duration-150">
					Learn more
					<ArrowRight size={12} />
				</button>
			</div>
		</motion.div>
	);
};

export default function InformationHub() {
	const [query, setQuery] = useState('');

	const filtered = query.trim()
		? HUB_ITEMS.filter(
				(i) =>
					i.title.toLowerCase().includes(query.toLowerCase()) ||
					i.description.toLowerCase().includes(query.toLowerCase()),
			)
		: HUB_ITEMS;

	return (
		<section
			id="inf-hub"
			className="relative overflow-hidden bg-[var(--color-aux-gray)] py-20 px-6 lg:px-8"
		>
			{/* Decorative quarter-circle top-right */}
			<div className="pointer-events-none absolute -top-28 -right-28 w-64 h-64 rounded-full bg-[var(--color-green-900)] opacity-95" />

			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Header row */}
				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
					{/* Left: title + description */}
					<motion.div
						variants={stagger}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
						className="max-w-xl"
					>
						<motion.p
							variants={fadeUp}
							className="text-sm font-display font-extrabold uppercase tracking-widest text-[var(--color-blue-900)] mb-1"
						>
							HUB
						</motion.p>
						<motion.h2
							variants={fadeUp}
							className="text-4xl lg:text-5xl font-black font-display text-gray-900 mb-4"
						>
							Information Hub
						</motion.h2>
						<motion.p
							variants={fadeUp}
							className="text-base text-gray-700 leading-relaxed"
						>
							The BRIA&apos;s Information Hub provides official
							information on a wide range of useful topics for
							immigrants in Ireland. The data comes from a vast
							selection of Official Irish Governmental Agencies.
						</motion.p>
					</motion.div>

					{/* Right: search */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{
							duration: 0.6,
							ease: 'easeOut',
							delay: 0.2,
						}}
						className="lg:w-96 flex flex-col gap-2"
					>
						<div className="relative flex items-center bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search"
								className="flex-1 px-6 py-3.5 text-sm font-display text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
							/>
							<button
								className="flex items-center justify-center w-12 h-12 bg-[var(--color-aux-gray)] text-gray-600 hover:text-gray-900 transition-colors shrink-0"
								aria-label="Search"
							>
								<Search size={18} />
							</button>
						</div>
						<p className="text-[11px] text-gray-500 text-right leading-tight px-1">
							BRIA is not responsible for the production or
							editing of the contents of this portal. We only
							direct users to the selected source of Truth.
						</p>
					</motion.div>
				</div>

				{/* Cards grid */}
				{filtered.length > 0 ? (
					<motion.div
						variants={stagger}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-50px' }}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
					>
						{filtered.map((item) => (
							<HubCard key={item.key} item={item} />
						))}
					</motion.div>
				) : (
					<div className="py-16 text-center text-gray-500 font-display">
						No results for &ldquo;{query}&rdquo;
					</div>
				)}

				{/* Footer */}
				<div className="mt-10 flex justify-end">
					<button className="inline-flex items-center gap-2 text-sm font-display font-semibold text-gray-700 hover:text-gray-900 transition-colors group">
						see all news
						<span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
							<ArrowRight size={13} />
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
