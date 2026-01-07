'use client'
import { AlertTriangle, BarChart3, DollarSign, Download, Edit3, FileEdit, FileText, Layers, Lock, Mail, MessageCircle, Minus, Share2, ShieldAlert, ShieldCheck, Zap } from "lucide-react"
const PRICING = [
    {
        "currency": {
            "code": "USD",
            "symbol": "$",
            "billing_note": "Prices shown in USD. Taxes may apply."
        },
        "plans": [
            {
                "id": "free",
                "name": "Free",
                "price": 0,
                "billing_cycle": "one-time",
                "tagline": "Try ContractKit before you commit",
                "features": [
                    {
                    "icon": FileText,
                    "label": "1 contract risk scan"
                    },
                    {
                    "icon": AlertTriangle,
                    "label": "Basic risk highlights"
                    },
                    {
                    "icon": DollarSign,
                    "label": "Payment & IP red flags"
                    },
                    {
                    "icon": MessageCircle,
                    "label": "Plain-English explanations"
                    }
                ],
                "limitations": [
                    "No suggested fixes",
                    "No report export"
                ],
                "cta": {
                    "label": "Run free scan",
                    "variant": "outline"
                },
                "highlighted": false
            },
             {
                "id": "starter_monthly",
                "name": "Starter",
                "price": 15,
                "billing_cycle": "monthly",
                "tagline": "For active freelancers & small agencies",
                "badge": "Best value",
                "features": [
                    {
                    "icon": Layers,
                    "label": "Up to 10 contract scans per month"
                    },
                    {
                    "icon": Zap,
                    "label": "Priority analysis"
                    },
                    {
                    "icon": ShieldCheck,
                    "label": "Advanced risk explanations"
                    },
                    {
                    "icon": FileEdit,
                    "label": "Suggested clause fixes you can reuse"
                    },
                    {
                    "icon": Share2,
                    "label": "Export & share reports"
                    },
                    {
                    "icon": Mail,
                    "label": "Email support"
                    }
                ],
                "limitations": [],
                "cta": {
                    "label": "Start monthly plan",
                    "variant": "primary"
                },
                "highlighted": true
            },
            {
                "id": "pay_as_you_go",
                "name": "Pay as you go",
                "price": 4,
                "billing_cycle": "per scan",
                "tagline": "Perfect for occasional contracts",
                "badge": "Most flexible",
                "features": [
                    {
                    "icon": ShieldAlert,
                    "label": "Full contract risk analysis"
                    },
                    {
                    "icon": Edit3,
                    "label": "Suggested fixes & safer wording"
                    },
                    {
                    "icon": BarChart3,
                    "label": "Clear risk score (Low / Medium / High)"
                    },
                    {
                    "icon":Download,
                    "label": "Downloadable risk summary"
                    },
                    {
                    "icon": Lock,
                    "label": "Secure contract deletion"
                    }
                ],
                "limitations": [],
                "cta": {
                    "label": "Analyze a contract",
                    "variant": "primary"
                },
                "highlighted": false
            }
        ],
        "disclaimer": [
            "ContractKit provides risk insights, not legal advice.",
            "Contracts are encrypted and never shared."
        ]
    }
]
const PricingSection = () => {
    return (
        <section className="py-10 md:py-20 px-6 relative" id="pricing">
            <div className=" mx-auto max-w-7xl md:px-6 md:mb-14 mb-7 text-center">
                <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">
                    Simple, transparent pricing
                </h1>
                <p className="mx-auto md:mt-6 mt-2 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">Pay only for what you need — no long-term commitments.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:px-10 xl:px-26 md:px-24">
                {PRICING[0].plans.map((price) => (
                    <div key={price.id} className=
                        {`relative
                        flex flex-col
                        rounded-2xl
                        border border-slate-200
                        bg-white
                        p-6
                        transition-all duration-300
                        ${price.highlighted ? "ring-2 ring-[#2563eb]  shadow-lg scale-[1.02] hover:shadow-lg " : " shadow-sm  hover:shadow-lg"}` }

                    >
                        {price.highlighted && <span className="pricing-badge">Best value</span>}

                        <h1 className="text-lg font-semibold text-slate-900">{price.name}</h1>
                        <h1 className="mt-4 text-4xl font-bold text-slate-900">
                            ${price.price}
                             <span className="billing-cycle">/{price.billing_cycle === 'monthly' ? 'mo' : price.billing_cycle}</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">{price.tagline}</p>
                        <ul className="mt-6 space-y-3">
                            {price.features.map((feature, index) => (
                                <li key={index} className="flex items-start text-sm text-slate-700">
                                    <feature.icon size={16} className="mt-0.5 mr-3 text-[#2563eb] flex-shrink-0" />
                                    {feature.label}
                                </li>
                            ))}
                        </ul>
                        {price.limitations.length > 0 && (
                            <ul className="limitations mt-4 text-sm text-slate-700">
                            {price.limitations.map((lim, i) => (
                                <li key={i} className="flex items-center gap-2 mb-2">
                                    <div className="rounded-full bg-slate-200 p-1">
                                        <Minus size={14} className=" text-slate-700" />
                                    </div>
                                    {lim}
                                </li>
                            ))}
                            </ul>
                        )}

                         <button className={`cta-btn ${price.cta.variant === 'primary' ? 'btn-primary' : 'btn-secondary'} mt-6`}>
                            {price.cta.label}
                        </button>
                        
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PricingSection
