import Link from "next/link";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="py-20 text-center">
        <p className="text-6xl font-bold text-cloud-400">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cloud-600"
        >
          Back to Home
        </Link>
      </div>
    </Section>
  );
}
