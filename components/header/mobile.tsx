import {
  Menu,
  ShoppingCart,
  User,
  Package,
  CreditCard,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchSheet from "./SearchSheet";

const NavBarMobile = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-3 px-4">
      {/* Left - menu icon */}
      <div className="w-1/3 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-1">
              <Menu className="h-6 w-6 text-logo-primary" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col" side="left">
            <SheetTitle className="mt-6 mb-8 text-center">
              <NextLink className="flex items-center justify-center" href="/">
                <Logo />
                <p className="font-bold text-logo-primary text-xl">ATURIA</p>
              </NextLink>
            </SheetTitle>

            <nav className="flex flex-col items-center gap-4 mt-6">
              {siteConfig.navItems.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={index}
                    className={`${
                      isActive
                        ? "text-logo-primary font-medium"
                        : "text-textColor-primary"
                    } text-base hover:text-textColor-secondary transition-all px-2 py-1`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <SheetFooter>
              {isLoading ? (
                <div className="w-full h-10 bg-muted rounded animate-pulse" />
              ) : isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-2 py-2 gap-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user?.full_name || ""} />
                        <AvatarFallback>
                          {user?.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user?.full_name}</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/payments" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payments
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-600 focus:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="w-full h-full" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Center - logo */}
      <div className="flex justify-center w-1/3">
        <NextLink className="flex items-center" href="/">
          <Logo />
          <p className="font-bold text-inherit text-logo-primary">ATURIA</p>
        </NextLink>
      </div>

      {/* Right - icons */}
      <div className="w-1/3 flex justify-end items-center gap-1">
        {/* Search */}
        <SearchSheet />

        {/* Cart */}
        <Button asChild variant="ghost" size="icon">
          <Link href="/cart">
            <ShoppingCart size={20} />
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavBarMobile;
