"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { OrderSummary } from "@/components/payment/order-summary";
import { AddressSelector } from "@/components/payment/address-selector";
import { PaymentMethodSelector } from "@/components/payment/payment-method-selector";
import { Card, CardContent } from "@/components/ui/card";
import type { Address } from "@/types/address";
import type { PaymentMethod } from "@/types/payment";
import { addressService } from "@/services/addressService";
import { fetchPaymentMethods } from "@/services/paymentmethodService";
import { useOrder } from "@/hooks/useOrder";

const PaymentPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCart(user?.id ? user.id : null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { placeOrder: placeOrderApi, isLoading: isOrderLoading } = useOrder();

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 10000 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const fetchUserAddresses = async () => {
      if (!user?.id) return;
      try {
        const userAddresses = await addressService.getUserAddresses(user.id);
        setAddresses(userAddresses);
        const defaultAddress = userAddresses.find((addr) => addr.is_default);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id.toString());
        } else if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const fetchMethods = async () => {
      try {
        const methods = await fetchPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedPaymentId(methods[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchUserAddresses();
    fetchMethods();
  }, [user?.id]);

  const handleAddAddress = () => {
    router.push("/profile?tab=addresses");
  };

  const handleAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handlePaymentMethodChange = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !selectedPaymentId || !user) return;

    setIsLoading(true);

    try {
      const address = addresses.find(
        (a) => a.id.toString() === selectedAddressId
      );
      if (!address) throw new Error("Address not found");

      const orderResult = await placeOrderApi({
        user_id: user.id,
        address: {
          recipient_name: address.recipient_name,
          phone_number: address.phone_number,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          province: address.province,
          postal_code: address.postal_code,
          country: address.country,
        },
        payment_method_id: Number(selectedPaymentId),
        items: cartItems.map(item => ({
          ...item,
          productId: item.id
        })),
        subtotal,
        shipping,
        tax,
        total,
      });

      router.push(`/checkout/confirmation?order=${orderResult.orderNumber}`);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-40">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Button>
      </div>

      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
              <AddressSelector
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onAddressChange={handleAddressChange}
                onAddAddress={handleAddAddress}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>
              <PaymentMethodSelector
                paymentMethods={paymentMethods}
                selectedPaymentId={selectedPaymentId}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <OrderSummary
            items={cartItems.map(item => ({
              ...item,
              productId: item.id
            }))}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            isLoading={isLoading || isOrderLoading}
            onPlaceOrder={handlePlaceOrder}
            isFormValid={Boolean(selectedAddressId && selectedPaymentId)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
