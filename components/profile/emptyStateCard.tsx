import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ComponentType, ReactNode, MouseEventHandler } from "react";

interface EmptyStateCardProps {
  icon: ComponentType<{ className?: string }>;
  title: ReactNode;
  description: ReactNode;
  buttonText: ReactNode;
  buttonAction: MouseEventHandler<HTMLButtonElement>;
}

export function EmptyStateCard({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  buttonAction 
}: EmptyStateCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {description}
        </p>
        <Button
          onClick={buttonAction}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}