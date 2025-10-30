import Hero3D from './components/Hero3D';
import ServicesGrid from './components/ServicesGrid';
import TestimonialsFAQ from './components/TestimonialsFAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-inter antialiased">
      <Hero3D />
      <HowItWorks />
      <ServicesGrid />
      <TestimonialsFAQ />
      <Footer />
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: 'Post a Job', desc: 'Describe your certification or customs requirement and set a budget.' },
    { title: 'Get Proposals', desc: 'Verified brokers submit proposals. Compare expertise, ratings, and bids.' },
    { title: 'Secure Escrow', desc: 'Fund the project in escrow. Payments are released on successful completion.' },
    { title: 'Track & Approve', desc: 'Chat, exchange documents, and track status until verification is complete.' },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">How it works</h2>
          <p className="mt-3 text-slate-600">From posting a job to verified completion — everything in one place.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="absolute -top-3 left-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white shadow-sm">
                {i + 1}
              </div>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
