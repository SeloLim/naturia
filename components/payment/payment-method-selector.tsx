"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentMethodIcons from "../paymentMethodIcons";
import type { PaymentMethod } from "@/types/payment"; // gunakan tipe dari payment, bukan checkout

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string | null;
  onPaymentMethodChange: (paymentId: string) => void;
}

export const PaymentMethodSelector = ({
  paymentMethods,
  selectedPaymentId,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup
      value={selectedPaymentId || undefined}
      onValueChange={onPaymentMethodChange}
      className="space-y-4"
    >
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`border rounded-lg p-4 relative hover:border-primary cursor-pointer ${
            selectedPaymentId === String(method.id) ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
          onClick={() => onPaymentMethodChange(String(method.id))}
        >
          <div className="flex items-center gap-4">
            <RadioGroupItem value={String(method.id)} id={String(method.id)} />
            <div className="flex items-center gap-3 flex-1">
              <PaymentMethodIcons
                methodCode={method.code}
                methodName={method.name}
                size={30}
              />
              <div>
                <p className="font-medium">{method.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};