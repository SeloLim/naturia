import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/auth";
import { Address } from "@/types/address";
import { AddressFormValues } from "./schema";

const addressFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  recipient_name: z.string().min(1, "Recipient name is required"),
  phone_number: z.string().min(8, "Valid phone number is required"),
  address_line1: z.string().min(5, "Address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postal_code: z.string().min(5, "Valid postal code is required"),
  country: z.string().default("Indonesia"),
  is_default: z.boolean().default(false),
});

type AddressFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAddress?: Address;
  onSave: (data: AddressFormValues) => void | Promise<void>;
  user?: User;
  addressesCount?: number;
};

export function AddressForm({
  open,
  onOpenChange,
  currentAddress,
  onSave,
  user,
  addressesCount = 0,
}: AddressFormProps) {
  const form = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      label: "",
      recipient_name: "",
      phone_number: "",
      address_line1: "",
      address_line2: "",
      city: "",
      province: "",
      postal_code: "",
      country: "Indonesia",
      is_default: false,
    },
  });

  useEffect(() => {
    if (currentAddress) {
      form.reset({
        label: currentAddress.label || "",
        recipient_name: currentAddress.recipient_name,
        phone_number: currentAddress.phone_number,
        address_line1: currentAddress.address_line1,
        address_line2: currentAddress.address_line2 || "",
        city: currentAddress.city,
        province: currentAddress.province,
        postal_code: currentAddress.postal_code,
        country: currentAddress.country,
        is_default: currentAddress.is_default,
      });
    } else {
      form.reset({
        label: "",
        recipient_name: user?.full_name || "",
        phone_number: user?.phone || "",
        address_line1: "",
        address_line2: "",
        city: "",
        province: "",
        postal_code: "",
        country: "Indonesia",
        is_default: addressesCount === 0,
      });
    }
  }, [form, currentAddress, user, addressesCount]);

  const handleSubmit = (data: AddressFormValues) => {
    // Ensure label is always a string
    const addressData: AddressFormValues = {
      ...data,
      label: data.label ?? "",
    };
    onSave(addressData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentAddress ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription>
            {currentAddress
              ? "Update your shipping address details below"
              : "Add a new shipping address to your account"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, Office, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Street address, building name, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, unit, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_default"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as default address</FormLabel>
                    <FormDescription>
                      This address will be used as your default shipping address
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {currentAddress ? "Update Address" : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}