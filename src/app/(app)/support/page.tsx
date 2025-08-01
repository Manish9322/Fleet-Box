import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupportForm } from "./_components/support-form";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Support Ticket Assistant</CardTitle>
          <CardDescription>
            Enter a customer's support ticket text below and our AI will suggest a response to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupportForm />
        </CardContent>
      </Card>
    </div>
  );
}
