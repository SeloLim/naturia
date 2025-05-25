import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

export function OrdersTab() {
  const router = useRouter();
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Building className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Looks like you haven&apos;t placed any orders yet. Explore our
          products to find your perfect skincare match.
        </p>
        <Button
          onClick={() => router.push("/collections")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
}