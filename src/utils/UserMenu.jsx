"use client";

import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, CreditCard, Upload } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function UserMenu({ user, onLogout }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 md:flex hidden">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-semibold">
                {getInitials(user.userName)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 md:flex flex-col hidden">
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium truncate">{"Your account"}</p>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />

          <div className="px-2">
            <p className="text-sm font-medium truncate">{user.userName}</p>
            <p
              className="truncate text-sm text-slate-500"
              title={user?.email ?? ""}
            >
              {user?.email ?? "No email available"}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItemLink icon={Upload} href="/upload" label="Upload" />
          <DropdownMenuItemLink icon={CreditCard} href="/#pricing" label="Buy credits" />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onLogout}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mb-4 flex items-center gap-3 md:hidden w-full">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-700">
            {getInitials(user?.userName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className="truncate font-semibold text-slate-900">
            {user?.userName ?? "Your account"}
          </p>

          <p
            className="truncate text-sm text-slate-500"
            title={user?.email ?? ""}
          >
            {user?.email ?? "No email available"}
          </p>
        </div>
      </div>
    </>
  );
}

function DropdownMenuItemLink({ icon: Icon, href, label }) {
  const router = useRouter();
  return (
    <DropdownMenuItem onClick={() => router.push(href)}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </DropdownMenuItem>
  );
}