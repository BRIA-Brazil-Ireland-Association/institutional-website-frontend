import { Mail } from 'lucide-react';

type SvgProps = React.SVGProps<SVGSVGElement>;

const InstagramIcon = (p: SvgProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
		<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
		<circle cx="12" cy="12" r="4" />
		<circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
	</svg>
);

const LinkedinIcon = (p: SvgProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect width="4" height="12" x="2" y="9" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);

const YoutubeIcon = (p: SvgProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
		<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
		<polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
	</svg>
);

const XIcon = (p: SvgProps) => (
	<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.84L2.2 2.25h6.418l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const FacebookIcon = (p: SvgProps) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	</svg>
);

const SOCIAL_LINKS = [
	{ icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
	{ icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
	{ icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
	{ icon: XIcon, href: 'https://x.com', label: 'X' },
	{ icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
];

const BriaLogoWhite = () => (
	<div className="flex items-center gap-3 shrink-0">
		<svg
			width="36"
			height="36"
			viewBox="0 0 40 40"
			fill="none"
			aria-hidden="true"
		>
			<rect
				x="1"
				y="1"
				width="38"
				height="38"
				rx="3"
				stroke="white"
				strokeWidth="2"
			/>
			<text
				x="20"
				y="27"
				textAnchor="middle"
				fontSize="18"
				fontWeight="900"
				fill="white"
				fontFamily="var(--font-display)"
			>
				B
			</text>
		</svg>
		<div className="w-px h-8 bg-white/25" />
		<div>
			<div className="text-white text-lg font-black leading-none tracking-wider font-display">
				BRIA
			</div>
			<div className="text-white/50 text-[7px] tracking-[0.2em] leading-none mt-0.5 font-display">
				BRAZIL-IRELAND ASSOCIATION
			</div>
		</div>
	</div>
);

export default function Footer() {
	return (
		<footer className="relative overflow-hidden bg-[#0d1f1a]">
			{/* Top coloured strip — green | teal | orange */}
			<div className="flex h-1.5">
				<div className="flex-1 bg-[var(--color-green-700)]" />
				<div className="flex-1 bg-[var(--color-aux-teal-500)]" />
				<div className="flex-1 bg-[var(--color-orange-700)]" />
			</div>

			{/* Decorative orange arc top-right */}
			<div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full border-[14px] border-[var(--color-orange-700)] opacity-70" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-6">
				<div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 lg:justify-between">
					{/* Copyright */}
					<p className="text-white/55 text-xs font-display text-center lg:text-left whitespace-nowrap">
						Copyright © 2025 | Brazil Ireland Association
					</p>

					<div className="hidden lg:block w-px h-8 bg-white/20 mx-6 shrink-0" />

					{/* Contact */}
					<div className="flex flex-col sm:flex-row items-center gap-3">
						<span className="text-white font-display font-semibold text-sm whitespace-nowrap">
							Contact us
						</span>
						<div className="flex items-start gap-2">
							<Mail
								size={16}
								className="text-white/50 mt-0.5 shrink-0"
							/>
							<div className="flex flex-col gap-0.5">
								<a
									href="mailto:contato@brazilirelandassociation.org"
									className="text-white/60 text-xs hover:text-white transition-colors leading-tight"
								>
									contato@brazilirelandassociation.org
								</a>
								<a
									href="mailto:board@brazilirelandassociation.org"
									className="text-white/60 text-xs hover:text-white transition-colors leading-tight"
								>
									board@brazilirelandassociation.org
								</a>
							</div>
						</div>
					</div>

					{/* Social icons */}
					<div className="flex items-center gap-2 lg:mx-8">
						{SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
							<a
								key={label}
								href={href}
								aria-label={label}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white/60 hover:border-white hover:text-white transition-colors duration-150"
							>
								<Icon width={13} height={13} />
							</a>
						))}
					</div>

					{/* BRIA logo */}
					<BriaLogoWhite />
				</div>
			</div>
		</footer>
	);
}
