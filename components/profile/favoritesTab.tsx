import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function FavoritesTab() {
  const router = useRouter();
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Favorites</CardTitle>
        <CardDescription>
          Products you&apos;ve saved for later
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          You haven&apos;t saved any products yet. Browse our collection
          and click the heart icon to save your favorites.
        </p>
        <Button
          onClick={() => router.push("/collections")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Browse Products
        </Button>
      </CardContent>
    </Card>
  );
}