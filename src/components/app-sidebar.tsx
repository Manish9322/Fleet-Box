"use client"

import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Car,
  LayoutGrid,
  Users,
  BookCopy,
  Wallet,
  Headset,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/drivers", icon: Users, label: "Drivers" },
  { href: "/cabs", icon: Car, label: "Cab Catalog" },
  { href: "/bookings", icon: BookCopy, label: "Booking History" },
  { href: "/transactions", icon: Wallet, label: "Transaction Log" },
  { href: "/support", icon: Headset, label: "Support" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
         <div className="flex items-center gap-2">
            <Car
              className={`text-primary transition-all duration-300 ${
                state === "collapsed" ? "h-6 w-6" : "h-8 w-8"
              }`}
            />
            <h1
              className={`font-bold text-xl font-headline transition-all duration-300 ${
                state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
              }`}
            >
              Fleet-Box
            </h1>
         </div>
         <SidebarTrigger className="hidden sm:flex" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start items-center gap-2 p-2 ${state === 'collapsed' ? 'justify-center' : ''}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage data-ai-hint="person portrait" src="https://placehold.co/40x40.png" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className={`text-left leading-tight ${state === 'collapsed' ? 'hidden' : ''}`}>
                <p className="font-semibold">Manish S.</p>
                <p className="text-xs text-muted-foreground">manish@fleet.com</p>
              </div>
              <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${state === 'collapsed' ? 'hidden' : ''}`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </a>
              </Button>
               <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10" asChild>
                <a href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </a>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  )
}
