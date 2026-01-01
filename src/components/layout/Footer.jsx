export default function Footer() {
  return (
    <footer className=" w-full relative ">
    {/* Radial Gradient Background from Bottom */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle 600px at 0% 200px, #F1F5F9, transparent),
          radial-gradient(circle 600px at 100% 200px, #F1F5F9, transparent)
        `,
      }}
    />
      <div className="mx-auto max-w-7xl px-6 py-12 relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              ContractKit
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Fast, affordable contract risk analysis for freelancers and small agencies.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Built for independent professionals. Privacy-first by design.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Product
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#how-it-works" className="text-slate-600 hover:text-blue-600">How it works</a></li>
              <li><a href="#features" className="text-slate-600 hover:text-blue-600">Features</a></li>
              <li><a href="#use-cases" className="text-slate-600 hover:text-blue-600">Use cases</a></li>
              <li><a href="/pricing" className="text-slate-600 hover:text-blue-600">Pricing</a></li>
              <li><a href="/sample-report" className="text-slate-600 hover:text-blue-600">Sample report</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Resources
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/templates" className="text-slate-600 hover:text-blue-600">Contract templates</a></li>
              <li><a href="/blog" className="text-slate-600 hover:text-blue-600">Guides & blog</a></li>
              <li><a href="/faq" className="text-slate-600 hover:text-blue-600">FAQ</a></li>
              <li><a href="/support" className="text-slate-600 hover:text-blue-600">Support</a></li>
              <li><a href="/contact" className="text-slate-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Legal & Trust
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/privacy" className="text-slate-600 hover:text-blue-600">Privacy policy</a></li>
              <li><a href="/terms" className="text-slate-600 hover:text-blue-600">Terms of service</a></li>
              <li><a href="/security" className="text-slate-600 hover:text-blue-600">Data security</a></li>
              <li><a href="/disclaimer" className="text-slate-600 hover:text-blue-600">Legal disclaimer</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> ContractKit provides automated contract risk insights for informational
            purposes only and does not constitute legal advice. For legal decisions, consult a qualified lawyer.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} ContractKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}