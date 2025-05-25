"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AddressFormValues,
  ProfileFormValues,
} from "@/components/profile/schema";
import { Address } from "@/types/address";
import { addressService } from "@/services/addressService";
import { ProfileOverview } from "@/components/profile/profileOverview";
import { AddressList } from "@/components/profile/addressList";
import { OrdersTab } from "@/components/profile/ordersTab";
import { FavoritesTab } from "@/components/profile/favoritesTab";
import { SettingsTab } from "@/components/profile/settingsTab";
import { ProfileForm } from "@/components/profile/profileForm";
import { AddressForm } from "@/components/profile/addressForm";
import { User } from "@/types/auth";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [displayedUser, setDisplayedUser] = useState<User | null>(user);

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const loadUserAddresses = useCallback(async () => {
    if (!user) return;
    try {
      const userAddresses = await addressService.getUserAddresses(user.id);
      setAddresses(userAddresses);
    } catch {
      toast.error("Failed to load addresses");
    }
  }, [user]);

  const fetchAndSetUserProfile = useCallback(async () => {
    if (!user?.id) return;
    const apiEndpoint = `http://localhost:3000/api/profile/${user.id}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Failed to load updated profile data");
        return;
      }
      const latestUserData: User = {
        ...await response.json(),
        email: user.email,
      };
      setDisplayedUser(latestUserData); // Perbarui state lokal
      toast.success("Profile data refreshed"); // Opsional: Notifikasi refresh
    } catch {
      toast.error("Error fetching updated profile data");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;
    const apiEndpoint = `http://localhost:3000/api/profile/${user.id}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          role: user.role || "customer",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `API Update Error: ${
            errorData?.error || errorData?.message || response.statusText
          }`
        );
        return;
      }
      toast.success("Profile updated successfully");
      setIsProfileModalOpen(false);
      fetchAndSetUserProfile();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  const handleSaveAddress = async (data: AddressFormValues) => {
    if (!user) return;

    try {
      if (currentAddress) {
        // Update existing address
        await addressService.updateAddress(
          user.id,
          currentAddress.id.toString(),
          {
            ...data,
            user_id: user.id,
          }
        );
        toast.success("Address updated successfully");
      } else {
        await addressService.addAddress(user.id, {
          ...data,
          user_id: user.id,
        });
        toast.success("Address added successfully");
      }

      // Close modal and refresh addresses
      setIsAddressModalOpen(false);
      setCurrentAddress(null);
      loadUserAddresses();
      setActiveTab("addresses");
    } catch {
      toast.error(
        currentAddress ? "Failed to update address" : "Failed to add address"
      );
    }
  };

  const handleDeleteAddress = async (id: string | number) => {
    if (!user) return;
    try {
      await addressService.deleteAddress(user.id, Number(id));
      toast.success("Address deleted successfully");
      loadUserAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string | number) => {
    if (!user) return;
    try {
      await addressService.setDefaultAddress(user.id, id.toString());
      toast.success("Default address updated");
      loadUserAddresses();
    } catch {
      toast.error("Failed to update default address");
    }
  };

  const openEditModal = (address: Address) => {
    setCurrentAddress(address);
    setIsAddressModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentAddress(null);
    setIsAddressModalOpen(true);
  };

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
      return;
    }

    if (user && !isLoaded) {
      loadUserAddresses();
      setDisplayedUser(user);
      setIsLoaded(true);
    }
  }, [isAuthenticated, isLoaded, isLoading, loadUserAddresses, router, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-emerald-600 font-medium">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!displayedUser) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen pt-32">
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-emerald-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-500">
            Manage your Naturia account and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings" className="hidden lg:inline-flex">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ProfileOverview
              user={displayedUser}
              addresses={addresses}
              onAddAddress={openAddModal}
              onEditProfile={() => setIsProfileModalOpen(true)}
              onLogout={handleLogout}
            />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressList
              addresses={addresses}
              onSetDefault={handleSetDefault}
              onAddClick={openAddModal}
              onEdit={openEditModal}
              onDelete={handleDeleteAddress}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Form Dialog */}
      {displayedUser && (
        <ProfileForm
          open={isProfileModalOpen}
          onOpenChange={setIsProfileModalOpen}
          user={displayedUser} 
          onSave={handleUpdateProfile}
        />
      )}

      {/* Address Form Dialog */}
      <AddressForm
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        currentAddress={currentAddress ?? undefined}
        user={user}
        addressesCount={addresses.length}
        onSave={handleSaveAddress}
      />
    </div>
  );
}
