import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Image src="/logo.svg" alt="Cloudwalker IT" width={44} height={44} className="h-11 w-11" />
              <span>
                <span className="text-cloud-400">Cloud</span>
                <span className="text-white">walker</span>
                <span className="text-gray-400">.IT</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Azure cloud engineering, with AWS through 010 Consulting. Makers of KrakenKey and Atomatize.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              United States, working remotely
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Site</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/services/" className="text-sm text-gray-400 hover:text-cloud-400">Services</Link></li>
              <li><Link href="/products/#krakenkey" className="text-sm text-gray-400 hover:text-cloud-400">KrakenKey</Link></li>
              <li><Link href="/products/#atomatize" className="text-sm text-gray-400 hover:text-cloud-400">Atomatize</Link></li>
              <li><Link href="/insights/" className="text-sm text-gray-400 hover:text-cloud-400">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about/" className="text-sm text-gray-400 hover:text-cloud-400">About</Link></li>
              <li><Link href="/contact/" className="text-sm text-gray-400 hover:text-cloud-400">Contact</Link></li>
              <li><Link href="/privacy/" className="text-sm text-gray-400 hover:text-cloud-400">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Connect</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="mailto:hello@cloudwalker.it" className="text-sm text-gray-400 hover:text-cloud-400">hello@cloudwalker.it</a></li>
              {/* TODO: add real LinkedIn / GitHub URLs when confirmed —
                  the previous linkedin.com/company/cloudwalker-it and
                  github.com/cloudwalker-it links were placeholders. */}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Cloudwalker IT
        </div>
      </div>
    </footer>
  );
}
