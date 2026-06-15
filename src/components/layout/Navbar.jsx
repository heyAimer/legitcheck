"use client"
import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react";

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
import { useAuth } from "@/utils/hooks/useAuth";
import { Button } from "../ui/button";

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
    href: "/freelancers",
    description: "Avoid unfair clauses and protect your payment.",
  },
  {
    title: "Small agencies",
    href: "/agencies",
    description: "Catch scope creep and risky client terms early.",
  },
  {
    title: "Designers & developers",
    href: "/creators",
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
    const { data, isLoading, error } = useAuth();

    const userLoggedIn = data?.data?.authenticated;

    if (error) return <div className="justify-center items-center flex w-full h-screen font-semibold text-2xl">Error checking auth.</div>;
    
    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
           
            <div className="mx-auto px-6 py-2 md:py-0 flex justify-between items-center">
                <Link href='/' className="text-lg font-semibold">
                    LegitCheck
                </Link>
                
                <div className="hidden md:flex">
                    <NavigationMenu className="h-14 flex items-center">
                        <NavigationMenuList className="flex items-center">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-4 md:w-[400px] lg:w-[500px] p-4">
                                        {
                                            PRODUCT_ITEMS.map((item) => (
                                                <ListItem
                                                    key={item.title}
                                                    title={item.title}
                                                    href={item.href}
                                                >
                                                    {item.description}
                                                </ListItem>
                                            ))
                                        }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Use cases</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                <ul className="grid gap-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
                                    {USE_CASE_ITEMS.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                    ))}
                                </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <button onClick={() => scrollToSection("pricing")}>Pricing</button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                
                {!userLoggedIn ? (
                    <div className="hidden md:flex gap-4 items-center">
                        <Link href="/signin" className="btn btn-secondary cursor-pointer">
                            <Button>
                                Sign in
                            </Button>
                        </Link>
                        <Link href="/signup" className="btn btn-secondary cursor-pointer">
                            <Button>
                                Sign up
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="hidden md:flex gap-4 items-center">
                            <Link href="/upload">
                                <Button>
                                    Try free analysis
                                </Button>
                        </Link>
                    </div>
                )}

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
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
                            <MobileNav />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

function MobileNav() {
    return (
        <nav className="mt-8 flex flex-col gap-6 font-semibold">
            {/* PRODUCT */}
            <div>
                <p className="mb-4 text-sm text-muted-foreground">Product</p>
                <div className="flex flex-col gap-2">
                {PRODUCT_ITEMS.map((item) => (
                    <Link key={item.title} href={item.href}>
                    {item.title}
                    </Link>
                ))}
                </div>
            </div>

            {/* USE CASES */}
            <div>
                <p className="mb-4 text-sm text-muted-foreground">Use cases</p>
                <div className="flex flex-col gap-2">
                {USE_CASE_ITEMS.map((item) => (
                    <button onClick={() => scrollToSection(item.href)} key={item.title}>
                    {item.title}
                    </button>
                ))}
                </div>
            </div>

            <button onClick={() => scrollToSection("pricing")}>Pricing</button>

            <div className="border-t pt-6 flex flex-col gap-3 text-center text-sm font-medium">
                <Link href="/signin" className="btn2 btn-secondary cursor-pointer">
                    Sign in
                </Link>
                <Link href="/tryFree" className="btn-primary btn2 cursor-pointer ">
                    Try free analysis
                </Link>
            </div>
         </nav>
    )
}

function ListItem({
  title,
  children,
  href,
  ...props
}) {
    return (
        <li {...props}> 
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="
                        block rounded-md p-3
                        transition-colors
                        hover:bg-accent
                        focus:bg-accent
                        focus:outline-none
                    "
                >
                    <div className="text-md leading-none font-medium mb-1">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-[14px] leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
    
}
