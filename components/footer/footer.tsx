"use client";
import Link from "next/link";
import { Logo } from "@/components/icons";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentMethod } from "@/types/payment";
import { fetchPaymentMethods } from "@/services/paymentmethodService";
import PaymentMethodIcons from "../paymentMethodIcons";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    // Fetch payment methods when the component mounts
    const getPaymentMethods = async () => {
      const methods = await fetchPaymentMethods();
      setPaymentMethods(methods);
    };

    getPaymentMethods();
  }, []);

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="bg-gray-100 pt-16 pb-6 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="h-8 w-8" />
              <p className="font-bold text-inherit text-logo-primary">ATURIA</p>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted skincare partner. Discover high-quality products made
              with love and care for your beauty journey.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white"
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Our Collections", href: "/collections" },
                { label: "Our Story", href: "/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-logo-primary text-sm flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Support</h3>
            <ul className="space-y-2">
              {[
                { label: "Shipping & Delivery", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "FAQs", href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-logo-primary text-sm flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Phone size={16} className="text-gray-500 mt-1" />
                <p className="text-sm text-gray-600">+62 812 3456 7890</p>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={16} className="text-gray-500 mt-1" />
                <p className="text-sm text-gray-600">support@naturia.com</p>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-gray-500 mt-1" />
                <p className="text-sm text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Trust Badges */}
        <div className="border-t border-gray-200 pt-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {/* Map over the fetched paymentMethods state */}
                {paymentMethods.map((method) => (
                  <div
                    key={method.id} // Use unique ID as key
                    className="bg-white border rounded-md px-4 py-2 text-xs font-medium text-gray-600"
                  >
                    <div className="flex justify-center mb-1">
                      <PaymentMethodIcons
                        methodCode={method.code}
                        methodName={method.name}
                        size={30}
                      />
                    </div>

                    <span className="px-2 text-xs text-black/90">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Secure Shopping</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard size={18} className="text-logo-primary" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={18} className="text-logo-primary" />
                  <span>100% Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Naturia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
