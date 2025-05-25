"use client";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Package,
  Heart,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import SearchSheet from "./SearchSheet";

export function NavBar() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex flex-col w-full gap-2 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center gap-2">
        {/* Left */}
        <div className="w-1/3 justify-start" />
        {/* Center */}
        <NextLink className="flex justify-center items-center w-1/3" href="/">
          <Logo />
          <p className="font-bold text-inherit text-logo-primary">ATURIA</p>
        </NextLink>
        {/* Right */}
        <div className="flex justify-end items-center w-1/3 gap-2">
          <SearchSheet />

          {/* Cart */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </Button>

          {/* Masuk / User Account */}
          {isLoading ? (
            <div className="w-24 h-8 bg-muted rounded animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.full_name || ""} />
                    <AvatarFallback>
                      {user?.full_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user?.full_name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile?tab=overview" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span className="mx-2">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile?tab=orders" className="flex items-center w-full">
                    <Package className="mr-2 h-4 w-4" />
                    <span className="mx-2">Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile?tab=favorites" className="flex items-center w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    <span className="mx-2">Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth">Masuk</Link>
            </Button>
          )}
        </div>
      </div>
      {/* NavMenu */}
      <ul className="flex justify-center gap-6 list-none border-t-1 pt-1">
        {siteConfig.navItems.map((item) => (
          <li key={item.href}>
            <NextLink
              className="data-[active=true]:text-logo-primary data-[active=true]:font-medium text-textColor-primary hover:text-textColor-secondary"
              data-active={pathname === item.href}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
