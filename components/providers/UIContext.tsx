'use client';

import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'pt';

type UIContextValue = {
	language: Language;
	setLanguage: (lang: Language) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>('en');

	return (
		<UIContext.Provider value={{ language, setLanguage }}>
			{children}
		</UIContext.Provider>
	);
}

export function useUI() {
	const ctx = useContext(UIContext);
	if (!ctx) throw new Error('useUI must be used within UIProvider');
	return ctx;
}
