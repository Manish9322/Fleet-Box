
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupportForm } from "./_components/support-form";
import { LiveChatDialog } from "./_components/live-chat-dialog";

const faqs = [
    {
        question: "How do I book a cab?",
        answer: "You can book a cab through our mobile app or website. Simply enter your pickup and drop-off locations, choose your cab type, and confirm your booking. You'll receive a confirmation with your driver's details."
    },
    {
        question: "What are the payment options?",
        answer: "We accept various payment methods, including credit/debit cards, net banking, UPI, and popular digital wallets. You can also choose to pay in cash to the driver at the end of your ride."
    },
    {
        question: "How can I cancel a booking?",
        answer: "To cancel a booking, go to the 'My Bookings' section in the app, select the ride you want to cancel, and tap the 'Cancel Ride' button. Please note that a cancellation fee may apply depending on the timing of your cancellation."
    },
    {
        question: "How is the fare calculated?",
        answer: "Fares are calculated based on the distance of the trip, the base fare for the chosen cab type, and any applicable surcharges such as tolls or peak hour pricing. You can see an estimated fare before confirming your booking."
    },
     {
        question: "What if I lose an item in a cab?",
        answer: "If you've left an item in one of our cabs, please contact our customer support team immediately through the app or by calling our helpline. Provide your booking details, and we will do our best to help you retrieve your lost item."
    },
    {
        question: "How do I rate my driver?",
        answer: "After your trip is completed, you will be prompted to rate your driver and provide feedback on your experience. Your ratings help us maintain a high quality of service."
    },
    {
        question: "Are there any waiting charges?",
        answer: "A nominal waiting charge may be applied if your driver has to wait for more than 5 minutes at the pickup location. The charges will be reflected in your final bill."
    },
    {
        question: "Can I schedule a ride in advance?",
        answer: "Yes, you can schedule a ride for a later date and time using the 'Schedule Ride' feature in the app. This is perfect for planning airport transfers or important appointments."
    }
]

export default function SupportPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
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
        <Card>
            <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>If you can't find what you're looking for, our team is here to assist.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Our support team is available around the clock to help you with any issues or questions you might have. For immediate assistance, you can start a live chat with one of our agents.</p>
                    <LiveChatDialog />
                </div>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
         <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
