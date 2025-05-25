import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { Address } from "@/types/address";

type AddressCardProps = {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: Address["id"]) => void;
  onSetDefault: (id: Address["id"]) => void;
};

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg relative ${
        address.is_default
          ? "border-emerald-300 bg-emerald-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center">
          <div className="font-medium">{address.label || "Address"}</div>
          {address.is_default && (
            <Badge className="ml-2 bg-emerald-100 text-emerald-800 border-emerald-200">
              Default
            </Badge>
          )}
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(address)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            onClick={() => onDelete(address.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm font-medium">{address.recipient_name}</div>
      <div className="text-sm text-gray-500">{address.phone_number}</div>

      <div className="text-sm mt-2">
        {address.address_line1}
        {address.address_line2 && <>, {address.address_line2}</>}
        <br />
        {address.city}, {address.province}, {address.postal_code}
      </div>

      {!address.is_default && (
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => onSetDefault(address.id)}
          >
            Set as Default
          </Button>
        </div>
      )}
    </div>
  );
}
