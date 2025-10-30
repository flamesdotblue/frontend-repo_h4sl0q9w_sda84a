import { Mail, Phone, Shield, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-semibold text-white">TradePortal</div>
            <p className="mt-2 text-sm text-slate-400">
              A unified platform connecting businesses and licensed brokers for global trade compliance.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">How it Works</a></li>
              <li><a href="#" className="hover:text-white">Broker Marketplace</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Legal</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white">Data Processing</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> support@tradeportal.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4"/> Verified Brokers • Secure Escrow</li>
            </ul>
            <div className="mt-4 flex items-center gap-3 text-slate-400">
              <a href="#" aria-label="GitHub" className="hover:text-white"><Github className="h-5 w-5"/></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-5 w-5"/></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} TradePortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
