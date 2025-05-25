import { Star } from "lucide-react";

export const Rating = ({ value = 4.5, showValue = true }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.floor(value)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
      {showValue && <span className="text-sm text-gray-600 ml-1">{value}</span>}
    </div>
  );
};