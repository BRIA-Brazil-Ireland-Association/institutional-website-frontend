export default function EmbassyBanner() {
	return (
		<section className="bg-[#001c6e] py-7 px-6 lg:px-8">
			<div className="max-w-7xl mx-auto flex items-center justify-center gap-8 sm:gap-12">
				<span className="text-white font-display font-semibold text-base sm:text-lg tracking-wide">
					Support
				</span>

				<div className="w-px h-10 bg-white/20 shrink-0" />

				{/* Embassy of Brazil Dublin */}
				<div className="flex flex-col items-center select-none">
					<span className="text-white/70 font-display text-[10px] sm:text-xs tracking-[0.35em] uppercase leading-none mb-0.5">
						Embassy of
					</span>
					<span className="text-white font-black font-display text-3xl sm:text-4xl leading-none tracking-wider">
						BRAZIL
					</span>

					{/* Brazilian flag colour bar */}
					<div className="flex w-full mt-1.5 h-[3px] rounded-sm overflow-hidden">
						<div className="flex-1 bg-[#009c3b]" />
						<div className="flex-1 bg-[#fedf00]" />
						<div className="flex-1 bg-[#003399]" />
					</div>

					<span className="text-white/70 font-display text-[10px] sm:text-xs tracking-[0.45em] uppercase leading-none mt-1.5">
						DUBLIN
					</span>
				</div>
			</div>
		</section>
	);
}
