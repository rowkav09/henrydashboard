/** @type {import('next').NextConfig} */
const nextConfig = {
	// Ensure Node.js runtime for API routes on Vercel
	experimental: {
		// Keep default appDir behavior
	},
	output: 'standalone'
}

module.exports = nextConfig
