import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SummaryCardProps = {
  title: string;
  content: string;
  actionText: string;
  onAction: () => void;
};

export function SummaryCard({ title, content, actionText, onAction }: SummaryCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <p className="text-gray-500">{content}</p>
          <Button
            variant="link"
            onClick={onAction}
            className="mt-2"
          >
            {actionText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}