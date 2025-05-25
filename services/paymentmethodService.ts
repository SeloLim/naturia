import { PaymentMethod } from "@/types/payment";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + '/api/payment-methods';

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      // Log the error or handle it as needed
      console.error(`API call failed: ${response.status} ${response.statusText}`);
      return []; // Return empty array on non-OK response
    }

    const data: PaymentMethod[] = await response.json();

    // Optional: Filter active methods here or in the component
    const activeMethods = data.filter(method => method.is_active);

    // Optional: Sort by display_order if needed (handling nulls)
    activeMethods.sort((a, b) => {
      if (a.display_order === null && b.display_order === null) return 0;
      if (a.display_order === null) return 1; // Nulls at the end
      if (b.display_order === null) return -1; // Nulls at the end
      return a.display_order - b.display_order;
    });


    return activeMethods;

  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return []; // Return empty array on error
  }
}