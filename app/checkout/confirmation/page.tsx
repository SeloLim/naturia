"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  ChevronRight,
  ShoppingBag,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { useOrderDetails } from "@/hooks/useOrderDetails";

// Loading component for Suspense fallback
function ConfirmationPageLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-40">
      <main className="container mx-auto py-8 px-4 md:px-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { order, loading, error } = useOrderDetails(orderNumber);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading && order) {
      setProgress(100);
    }
  }, [loading, order]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading order details...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-red-500">Order not found or failed to load.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-40">
      <main className="container mx-auto py-8 px-4 md:px-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Success message */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600">
              Your order has been received and is now being processed.
            </p>
          </div>

          {/* Order progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                Order #{order.orderNumber}
              </CardTitle>
              <CardDescription>Placed on {order.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-3 text-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-full bg-green-100 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Confirmed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-full bg-gray-100 mb-2">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Processing</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-full bg-gray-100 mb-2">
                      <Truck className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Shipped</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Order summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Image
                          src={item.image}
                          alt={item.name.name || "Product Image"} 
                          className="w-16 h-16 rounded-md object-cover"
                          width={64}
                          height={64}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name.name}</h3>{" "}
                          {/* Perubahan di sini */}
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>
                        {formatCurrency(
                          order.items.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-3">
                      <span>Total</span>
                      <span>{formatCurrency(order.totalAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Shipping Address</h3>
                      <p className="text-gray-600">
                        {order.shippingAddress.name}
                        <br />
                        {order.shippingAddress.address}
                        <br />
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Estimated Delivery</h3>
                      <div className="flex items-center">
                        <Calendar className="mr-2 w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {order.estimatedDelivery}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side panel */}
            <div className="space-y-6">
              {/* Payment details */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p>{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-between">
                    <span className="flex items-center">
                      <Download className="mr-2 w-4 h-4" />
                      Download Receipt
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <ShoppingBag className="mr-2 w-4 h-4" />
                      Continue Shopping
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Need help? */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    If you have any questions about your order, our customer
                    support team is here to help.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main component with Suspense wrapper
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationPageLoading />}>
      <ConfirmationContent />
    </Suspense>
  );
}