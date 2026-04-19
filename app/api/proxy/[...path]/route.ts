import { NextRequest, NextResponse } from 'next/server';

const HOP_BY_HOP = new Set([
	'connection',
	'keep-alive',
	'proxy-authenticate',
	'proxy-authorization',
	'te',
	'trailers',
	'transfer-encoding',
	'upgrade',
	'content-encoding',
]);

type Context = { params: Promise<{ path: string[] }> };

async function proxy(
	req: NextRequest,
	{ params }: Context,
): Promise<NextResponse> {
	const { path } = await params;

	const targetUrl = new URL(`${process.env.API_URL}/${path.join('/')}`);
	req.nextUrl.searchParams.forEach((value, key) => {
		targetUrl.searchParams.set(key, value);
	});

	const headers = new Headers();
	req.headers.forEach((value, key) => {
		if (!HOP_BY_HOP.has(key) && key !== 'host') {
			headers.set(key, value);
		}
	});
	if (process.env.API_TOKEN) {
		headers.set('Authorization', `Bearer ${process.env.API_TOKEN}`);
	}

	const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

	const upstream = await fetch(targetUrl, {
		method: req.method,
		headers,
		body: hasBody ? await req.arrayBuffer() : null,
	});

	const resHeaders = new Headers();
	upstream.headers.forEach((value, key) => {
		if (!HOP_BY_HOP.has(key)) {
			resHeaders.set(key, value);
		}
	});

	return new NextResponse(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: resHeaders,
	});
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
