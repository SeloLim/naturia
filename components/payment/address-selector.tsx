"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Home, Building, PlusCircle, MapPin } from "lucide-react";
import type { Address } from "@/types/address"; // gunakan tipe dari address

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onAddressChange: (addressId: string) => void;
  onAddAddress: () => void;
}

export const AddressSelector = ({
  addresses,
  selectedAddressId,
  onAddressChange,
  onAddAddress,
}: AddressSelectorProps) => {
  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <MapPin className="h-12 w-12 text-gray-300 mb-2" />
        <h3 className="text-lg font-medium mb-2">No addresses found</h3>
        <p className="text-gray-500 mb-4 text-center">
          Please add a shipping address to continue with your order
        </p>
        <Button onClick={onAddAddress} className="flex items-center">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>
    );
  }

  return (
    <div>
      <RadioGroup
        value={selectedAddressId || undefined}
        onValueChange={onAddressChange}
        className="space-y-4"
      >
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 relative hover:border-primary cursor-pointer ${
              selectedAddressId === address.id ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
            onClick={() => onAddressChange(String(address.id))}
          >
            <div className="flex items-start gap-4">
              <RadioGroupItem value={String(address.id)} id={String(address.id)} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {address.label === "Home" ? (
                    <Home className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Building className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="font-medium">{address.label}</span>
                  {address.is_default && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="font-medium">{address.recipient_name}</p>
                <p className="text-gray-600">{address.address_line1}</p>
                <p className="text-gray-600">{`${address.city}, ${address.province} ${address.postal_code}`}</p>
                <p className="text-gray-600">{address.phone_number}</p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={onAddAddress}
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>
    </div>
  );
};