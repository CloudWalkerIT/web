import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold">
              <span className="text-cloud-400">Cloud</span>
              <span className="text-white">walker</span>
              <span className="text-electric-400 text-sm">.it</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Intelligent IT solutions for the modern enterprise. Cloud infrastructure, AI-driven insights, and digital transformation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Solutions</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/services/" className="text-sm text-gray-500 hover:text-cloud-400">Services</Link></li>
              <li><Link href="/products/" className="text-sm text-gray-500 hover:text-cloud-400">ContentEngine</Link></li>
              <li><Link href="/insights/" className="text-sm text-gray-500 hover:text-cloud-400">Market Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about/" className="text-sm text-gray-500 hover:text-cloud-400">About Us</Link></li>
              <li><Link href="/contact/" className="text-sm text-gray-500 hover:text-cloud-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Connect</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-cloud-400">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-cloud-400">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Cloudwalker IT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
