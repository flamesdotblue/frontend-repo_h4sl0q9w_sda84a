import { FileCheck, ShieldCheck, Briefcase, Landmark, BadgeCheck } from 'lucide-react';

const services = [
  {
    title: 'IEC Registration',
    desc: 'Obtain your Importer Exporter Code quickly with guided documentation.',
    icon: Landmark,
    href: '#',
  },
  {
    title: 'AEO Certification',
    desc: 'Achieve Authorized Economic Operator status with vetted brokers.',
    icon: ShieldCheck,
    href: '#',
  },
  {
    title: 'EPR Compliance',
    desc: 'Extended Producer Responsibility documentation & filings.',
    icon: FileCheck,
    href: '#',
  },
  {
    title: 'BIS Licensing',
    desc: 'Bureau of Indian Standards certification, testing, and approvals.',
    icon: BadgeCheck,
    href: '#',
  },
  {
    title: 'Custom Clearance',
    desc: 'Licensed customs brokers for end-to-end documentation & clearance.',
    icon: Briefcase,
    href: '#',
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="relative w-full bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Services</h2>
          <p className="mt-3 text-slate-600">
            Core categories to help you manage trade compliance and certification.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-sky-600">
                Learn more
                <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-1">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white/90 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Need an instant quote?</h3>
              <p className="text-sm text-slate-600">Share details and our verified brokers will respond.</p>
            </div>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
