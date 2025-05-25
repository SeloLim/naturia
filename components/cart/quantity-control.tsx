import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0"
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { QuantityControl };
