import { Award, HeartHandshake, GraduationCap, Scale } from 'lucide-react';

const STROKE = 1.5;

const WorkIcon = ({ size = 48 }: { size?: number }) => (
	<Award size={size} strokeWidth={STROKE} />
);

const LegalIcon = ({ size = 48 }: { size?: number }) => (
	<HeartHandshake size={size} strokeWidth={STROKE} />
);

const CultureIcon = ({ size = 48 }: { size?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		stroke="currentColor"
		strokeWidth={STROKE}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M24 10 C28 10 34 14 34 20 C34 26 30 28 24 28 C18 28 14 26 14 20 C14 14 20 10 24 10Z" />
		<path d="M24 28 C20 28 12 26 10 32 C8 38 14 44 20 42 C26 40 28 34 26 28" />
		<path d="M24 28 C28 28 36 26 38 32 C40 38 34 44 28 42 C22 40 20 34 22 28" />
	</svg>
);

const HousingIcon = ({ size = 48 }: { size?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		stroke="currentColor"
		strokeWidth={STROKE}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M6 22L24 6L42 22" />
		<path d="M10 18V42H38V18" />
		<rect x="16" y="28" width="16" height="14" rx="1" />
		<text
			x="24"
			y="39"
			textAnchor="middle"
			fontSize="10"
			fontFamily="sans-serif"
			stroke="none"
			fill="currentColor"
			fontWeight="400"
		>
			$
		</text>
		<path d="M30 6H38V14" />
	</svg>
);

const CoursesIcon = ({ size = 48 }: { size?: number }) => (
	<GraduationCap size={size} strokeWidth={STROKE} />
);

const TrafficLawsIcon = ({ size = 48 }: { size?: number }) => (
	<Scale size={size} strokeWidth={STROKE} />
);

export type HubIconKey =
	| 'work'
	| 'legal'
	| 'culture'
	| 'housing'
	| 'courses'
	| 'trafficLaws';

const HUB_ICONS = {
	work: WorkIcon,
	legal: LegalIcon,
	culture: CultureIcon,
	housing: HousingIcon,
	courses: CoursesIcon,
	trafficLaws: TrafficLawsIcon,
} as const;

export default HUB_ICONS;
