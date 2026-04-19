import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { QueryProvider } from '@/components/providers/QueryProvider';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | Institutional Website',
		default: 'Institutional Website',
	},
	description: 'Institutional website',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className={geist.className}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
