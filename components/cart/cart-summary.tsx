import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// 2. Gunakan tipe props sebagai anotasi parameter, hapus React.FC
const CartSummary = ({ subtotal, shipping, tax, total }: CartSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href="/payment" className="w-full">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
            Proceed to Checkout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { CartSummary };
