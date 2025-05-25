import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { 
  Card, 
  CardFooter 
} from "@/components/ui/card";
import { User } from "@/types/auth";
import { Address } from "@/types/address";

interface ProfileOverviewProps {
  user: User;
  addresses: Address[];
  onEditProfile: () => void;
  onLogout: () => void;
  onAddAddress: () => void;
}

export function ProfileOverview({ user, addresses, onEditProfile, onLogout, onAddAddress }: ProfileOverviewProps) {
  const defaultAddress = addresses.find((addr) => addr.is_default);
  
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <div className="bg-emerald-100 h-24"></div>
      <div className="px-6 pb-6 relative">
        <div className="h-20 w-20 rounded-full bg-emerald-200 border-4 border-white absolute -top-10 flex items-center justify-center text-emerald-600">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.full_name || "Profile"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-medium">
              {user.full_name?.charAt(0) ||
                user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="pt-12">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">
                {user.full_name || "Naturia Member"}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 p-2 px-4"
            >
              {user.role === "customer" ? "Member" : user.role}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Phone Number
                </p>
                <p className="text-gray-900">
                  {user.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Birth Date
                </p>
                <p className="text-gray-900">
                  {user.birth_date
                    ? new Date(user.birth_date).toLocaleDateString()
                    : "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Skin Type
                </p>
                <p className="text-gray-900 capitalize">
                  {user.skin_type || "Not provided"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Default Shipping Address
              </h3>

              {defaultAddress ? (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between">
                    <div className="font-medium">
                      {defaultAddress.recipient_name}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      Default
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {defaultAddress.phone_number}
                  </div>
                  <div className="text-gray-700 mt-2">
                    {defaultAddress.address_line1}
                    {defaultAddress.address_line2 && (
                      <>, {defaultAddress.address_line2}</>
                    )}
                    <br />
                    {defaultAddress.city}, {defaultAddress.province},{" "}
                    {defaultAddress.postal_code}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-lg">
                  <MapPin className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-gray-500 text-center mb-4">
                    No default address set
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddAddress}
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CardFooter className="flex justify-end bg-gray-50 py-4">
        <Button
          variant="outline"
          onClick={onEditProfile}
          className="mr-2"
        >
          Edit Profile
        </Button>
        <Button variant="destructive" onClick={onLogout}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}