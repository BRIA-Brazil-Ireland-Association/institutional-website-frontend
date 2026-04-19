import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { UIProvider } from '@/components/providers/UIContext';
import Navbar from '@/components/ui/Navbar';
import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
});

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-body',
	display: 'swap',
});

const DESCRIPTION =
	'BRIA – Brazil-Ireland Association. Our main goal is to assist Brazilian professionals in Ireland in overcoming the challenges faced in seeking employment, career progression, and integration into the Irish job market.';

const SITE_URL = 'https://brazilirelandassociation.org';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		template: '%s | BRIA – Brazil-Ireland Association',
		default: 'BRIA – Brazil-Ireland Association',
	},
	description: DESCRIPTION,
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		siteName: 'BRIA – Brazil-Ireland Association',
		title: 'BRIA – Brazil-Ireland Association',
		description: DESCRIPTION,
		images: [
			{
				url: '/og-image.png',
				width: 1160,
				height: 442,
				alt: 'BRIA – Brazil-Ireland Association',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BRIA – Brazil-Ireland Association',
		description: DESCRIPTION,
		images: ['/og-image.png'],
	},
	icons: {
		icon: [
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
		other: [
			{
				rel: 'msapplication-TileImage',
				url: '/favicon-270x270.png',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className={`${montserrat.variable} ${roboto.variable}`}>
				<UIProvider>
					<Navbar />
					<QueryProvider>{children}</QueryProvider>
				</UIProvider>
			</body>
		</html>
	);
}
