/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// env: {
	// 	NEXT_PUBLIC_API_URL: process.env.API_URL,
	// 	NEXT_PUBLIC_API_TOKEN: process.env.API_TOKEN,
	// },
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;

