import { Address } from "@/types/address";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export const addressService = {
  // Get all addresses for a user
  getUserAddresses: async (userId: string): Promise<Address[]> => {
    try {
      const response = await fetch(
        `${API_URL}/api/profile/${userId}/address`
      );
      if (!response.ok) throw new Error("Failed to fetch addresses");
      return response.json();
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return [];
    }
  },

  // Add a new address
  addAddress: async (
    userId: string,
    address: Omit<Address, "id" | "created_at" | "updated_at">
  ): Promise<Address> => {
    try {
      const response = await fetch(
        `${API_URL}/api/profile/${userId}/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding address:", errorData);
        throw new Error(errorData?.error || "Failed to add address");
      }
      return response.json();
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  },

  updateAddress: async (
    profileId: string,
    addressId: string,
    address: Partial<Address>
  ): Promise<Address> => {
    try {
      const response = await fetch(
        `${API_URL}/api/profile/${profileId}/address/${addressId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );
      if (!response.ok) throw new Error("Failed to update address");
      return response.json();
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  },

  deleteAddress: async (
    profileId: string,
    addressId: number
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${API_URL}/api/profile/${profileId}/address/${addressId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete address");
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  },

  // Set an address as default
  setDefaultAddress: async (profileId: string, addressId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/profile/${profileId}/address/${addressId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_default: true })
      });

      if (!response.ok) throw new Error("Failed to set default address");
    } catch (error) {
      console.error("Error setting default address:", error);
      throw error;
    }
  },
};