"use client"

import Link from "next/link"
import { Loader2, Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "@/utils/providers/AuthProvider";

const PRODUCT_ITEMS = [
  {
    title: "How it works",
    href: "how-it-works",
    description:
      "Upload a contract and get clear risk highlights in under a minute.",
  },
  {
    title: "Risk analysis",
    href: "risk-analysis",
    description:
      "Instantly spot payment, IP, scope creep, and termination risks.",
  }
]

const USE_CASE_ITEMS = [
  {
    title: "Freelancers",
    href: "use-cases",
    description: "Avoid unfair clauses and protect your payment.",
  },
  {
    title: "Small agencies",
    href: "use-cases",
    description: "Catch scope creep and risky client terms early.",
  },
  {
    title: "Designers & developers",
    href: "use-cases",
    description: "Understand IP ownership and usage rights clearly.",
  },
]

const scrollToSection = (id) => {
    const section = document.getElementById(id)

    if (section) {
        section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        })
    } else {
        window.location.href = `/#${id}`
    }
}

export function Navbar() {
    const { data } = useAuthContext();
    const [open, setOpen] = useState(false);

    const userLoggedIn = data?.data?.authenticated === true;

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
           
            <div className="mx-auto px-6 py-6 md:py-2 flex justify-between items-center">

                <>
                    <Link href='/' className="flex items-center gap-3 cursor-pointer"> 
                        <Image
                            src="/icon.png"
                            alt="LegitCheck Logo"
                            width={12}
                            height={12}
                            priority
                            className="rounded-md h-auto w-auto"
                        />

                        <h3 className="text-lg font-semibold text-slate-900">
                        LegitCheck
                        </h3>
                        
                    </Link>
                    
                    <div className="hidden md:flex">
                        <NavigationMenu className="h-14 flex items-center">
                            <NavigationMenuList className="flex items-center">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <button onClick={() => scrollToSection("hero")} className="cursor-pointer">Home</button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="cursor-pointer">Product</NavigationMenuTrigger >
                                    <NavigationMenuContent>
                                        <ul className="grid gap-4 md:w-[400px] lg:w-[500px] p-4">
                                            {
                                                PRODUCT_ITEMS.map((item) => (
                                                    <ListItem
                                                        key={item.title}
                                                        title={item.title}
                                                        onClick={() => scrollToSection(item.href)}
                                                    >
                                                        {item.description}
                                                    </ListItem>
                                                ))
                                            }
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger  className="cursor-pointer">Use cases</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                    <ul className="grid gap-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
                                        {USE_CASE_ITEMS.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                onClick={() => scrollToSection(component.href)}
                                            >
                                            {component.description}
                                        </ListItem>
                                        ))}
                                    </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <button onClick={() => scrollToSection("pricing")} className="cursor-pointer">Pricing</button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    
                    <div className="hidden md:flex gap-4 items-center">
                        {userLoggedIn ? (
                            <Link href="/upload">
                            <Button>
                                Try free analysis
                            </Button>
                            </Link>
                        ) : (
                            <Link href="/signin">
                            <Button variant="outline">
                                Sign in
                            </Button>
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger className="cursor-pointer" asChild>
                                <button className="p-2">
                                    <Menu className="h-6 w-6"/>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <VisuallyHidden>
                                    <SheetTitle>
                                        mobile navigation
                                    </SheetTitle>
                                </VisuallyHidden>
                                <MobileNav userLoggedIn={userLoggedIn} closeMenu={() => setOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </>
            </div>
        </header>
    )
}

function MobileNav({ userLoggedIn, closeMenu }) {
    const handleNavigate = (id) => {
        closeMenu();

        requestAnimationFrame(() => {
            setTimeout(() => {
                scrollToSection(id);
            }, 100);
        });
    };
    
    return (
        <nav className="mt-8 flex flex-col gap-6 font-semibold">
            {/* PRODUCT */}
            <div>
                <p className="mb-4 text-sm text-muted-foreground">Product</p>
                <div className="flex flex-col gap-2">
                {PRODUCT_ITEMS.map((item) => (
                    <button className="cursor-pointer text-start bg-secondary hover:bg-primary/10 py-2 px-3 rounded-sm" key={item.title} onClick={() => handleNavigate(item.href)}>
                        {item.title}
                    </button>
                ))}
                </div>
            </div>

            {/* USE CASES */}
            <div>
                <p className="mb-4 text-sm text-muted-foreground">Use cases</p>
                <div className="flex flex-col gap-2">
                {USE_CASE_ITEMS.map((item) => (
                    <button className="cursor-pointer text-start bg-secondary hover:bg-primary/10 py-2 px-3 rounded-sm" onClick={() => handleNavigate(item.href)} key={item.title}>
                    {item.title}
                    </button>
                ))}
                </div>
            </div>

            <button onClick={() => handleNavigate("pricing")} className="cursor-pointer text-start bg-secondary hover:bg-primary/10 py-2 px-3 rounded-sm">Pricing</button>

            <div className="border-t pt-6 flex flex-col gap-3">
                {userLoggedIn ? (
                <Link href="/upload" onClick={closeMenu}>
                    <Button>
                        Try free analysis
                    </Button>
                </Link>
                ) : (
                <Link href="/signin" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                        Sign in
                    </Button>
                </Link>
                )}
            </div>
         </nav>
    )
}

function ListItem({
  title,
  children,
  onClick,
  ...props
}) {
    return (
        <li {...props}> 
            <NavigationMenuLink asChild>
                <button
                    onClick={onClick}
                    className="block rounded-md p-3 transition-colors hover:bg-accent focus:bg-accent focus:outline-none text-start cursor-pointer"
                >
                    <div className="text-md leading-none font-medium mb-1">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-[14px] leading-snug">
                        {children}
                    </p>
                </button>
            </NavigationMenuLink>
        </li>
    )
    
}
