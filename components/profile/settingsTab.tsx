import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type SettingsTabProps = {
  onLogout: () => void;
};

export function SettingsTab({ onLogout }: SettingsTabProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your preferences and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive emails about orders, promotions, and new products
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}