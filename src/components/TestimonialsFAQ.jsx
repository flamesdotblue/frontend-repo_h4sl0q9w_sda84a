import { useState } from 'react';
import { Star, MessageSquare, ChevronDown } from 'lucide-react';

const testimonials = [
  {
    name: 'Amit Verma',
    role: 'Export Manager, Sapphire Textiles',
    text: 'We completed BIS and EPR filings in record time. The broker marketplace and escrow gave us total confidence.',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, EcoWare Pvt Ltd',
    text: 'AEO certification felt daunting until we used this portal. Clear steps, verified experts, and smooth communication.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Customs Broker',
    text: 'Job feed and document center are excellent. Getting verified and winning projects has been seamless.',
  },
];

const faqs = [
  {
    q: 'How do brokers get verified?',
    a: 'Brokers undergo profile checks and document verification by our admin team before they can accept projects.',
  },
  {
    q: 'How are payments handled?',
    a: 'Clients fund an escrow at project start. Funds are released to brokers on completion, with refunds handled by admin in case of disputes.',
  },
  {
    q: 'Can I upload compliance documents securely?',
    a: 'Yes. Files are encrypted in transit and stored securely. Each document is tagged, tracked, and linked to its job.',
  },
  {
    q: 'Do you support IEC, AEO, BIS, and EPR?',
    a: 'Yes. The platform is tailored for these certifications plus customs documentation and clearance support.',
  },
];

export default function TestimonialsFAQ() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">What our users say</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="mb-2 flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700">“{t.text}”</p>
                <div className="mt-3 text-sm font-medium text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">FAQs</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50/50">
            {faqs.map((item, idx) => (
              <AccordionItem key={idx} q={item.q} a={item.a} />)
            )}
          </div>

          <div className="mt-6 rounded-xl bg-sky-50 p-4 text-sky-900 ring-1 ring-sky-100">
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-5 w-5" />
              <div>
                <div className="font-semibold">Need more help?</div>
                <p className="text-sm">
                  Chat with verified brokers or contact our support team for guidance on certifications and customs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-white px-5 py-4 text-left text-slate-900 hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="px-5 pb-4 text-sm text-slate-700 [overflow:hidden]">{a}</div>
      </div>
    </div>
  );
}
