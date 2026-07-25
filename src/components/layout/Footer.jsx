'use client'
import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Product",
    items: [
      {
        label: "How it works",
        type: "section",
        href: "how-it-works"
      },
      {
        label: "Risk analysis",
        type: "section",
        href: "risk-analysis"
      },
      {
        label: "Pricing",
        type: "section",
        href: "pricing"
      }
    ]
  },

  {
    title:"Company",
    items:[
      {
        label:"Contact",
        type:"page",
        href:"/contact"
      },

      {
        label:"Privacy",
        type:"page",
        href:"/privacy"
      },

      {
        label:"Terms",
        type:"page",
        href:"/terms"
      }
    ]
  },

  {
    title:"Legal",
    items:[
      {
        label:"Disclaimer",
        type:"page",
        href:"/disclaimer"
      }
    ]
  }
]

const handleNavigate=(id)=>{
  const section=document.getElementById(id);

  if(section){
    section.scrollIntoView({
    behavior:'smooth'
  })
  return;
  }

  window.location.href=`/#${id}`;
}

export default function Footer() {
  const handleLogoClick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  };
  
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
            <div onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer"> 
              <Image
                src="/iconLogo.png"
                alt="LegitCheck Logo"
                width={36}
                height={36}
                priority
                className="rounded-md h-9 w-9"
              />
              <h3 className="text-lg font-semibold text-slate-900">
                LegitCheck
              </h3>
            </div>
      
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Fast, affordable contract risk analysis for freelancers and small agencies.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Built for independent professionals. Privacy-first by design.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex md:justify-center">
              <div className="">
                <h4 className="font-semibold text-lg">{group.title}</h4>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>{item.type === "section" ?
                      <button onClick={() => handleNavigate(item.href)} className="text-slate-600 hover:text-blue-600 cursor-pointer">
                        {item.label}
                      </button>
                      :
                      <Link
                        href={item.href}ame="text-slate-600 hover:text-blue-600"
                        >
                        {item.label}
                      </Link>
                        }
                    </li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> LegitCheck provides automated contract risk insights for informational
            purposes only and does not constitute legal advice. For legal decisions, consult a qualified lawyer.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} LegitCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}