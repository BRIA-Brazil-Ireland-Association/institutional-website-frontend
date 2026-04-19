'use client';

import { useUI } from '@/components/providers/UIContext';

const LANGUAGES = [
	{ value: 'en' as const, label: 'EN', flag: '🇮🇪' },
	{ value: 'pt' as const, label: 'PT', flag: '🇧🇷' },
];

export default function LanguageSwitcher() {
	const { language, setLanguage } = useUI();

	return (
		<div className="flex items-center font-display">
			{LANGUAGES.map((l, i) => (
				<div key={l.value} className="flex items-center">
					{i > 0 && (
						<span className="text-gray-300 text-xs select-none mx-0.5">|</span>
					)}
					<button
						onClick={() => setLanguage(l.value)}
						className={`flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors ${
							language === l.value
								? 'text-[var(--color-green-700)] font-semibold'
								: 'text-gray-400 hover:text-gray-600'
						}`}
					>
						{l.label}
						<span className="text-base leading-none">{l.flag}</span>
					</button>
				</div>
			))}
		</div>
	);
}
