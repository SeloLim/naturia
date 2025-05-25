import { Button } from "@/components/ui/button";
import { Address } from "@/types/address";
import { MapPin } from "lucide-react";


interface DefaultAddressCardProps {
  defaultAddress?: Address;
  onAddAddress: () => void;
}

export function DefaultAddressCard({ defaultAddress, onAddAddress }: DefaultAddressCardProps) {
  return (
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
              <>
                , {defaultAddress.address_line2}
              </>
            )}
            <br />
            {defaultAddress.city}, {defaultAddress.province}, {defaultAddress.postal_code}
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
  );
}

export default DefaultAddressCard;