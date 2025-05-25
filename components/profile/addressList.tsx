import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { Address } from "@/types/address";
import { AddressCard } from "./addressCard";

interface AddressListProps {
  addresses: Address[];
  onAddClick: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: Address["id"]) => void;
  onSetDefault: (id: Address["id"]) => void;
}

export function AddressList({ addresses, onAddClick, onEdit, onDelete, onSetDefault }: AddressListProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Saved Addresses</CardTitle>
          <Button
            onClick={onAddClick}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Address
          </Button>
        </div>
        <CardDescription>
          Manage your shipping and billing addresses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg">
            <MapPin className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-center mb-4">
              You haven&apos;t added any addresses yet
            </p>
            <Button
              onClick={onAddClick}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={onEdit}
                onDelete={() => onDelete(address.id)}
                onSetDefault={() => onSetDefault(address.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}