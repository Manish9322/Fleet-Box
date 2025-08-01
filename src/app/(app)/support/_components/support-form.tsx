"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateResponse, GenerateResponseOutput } from '@/ai/flows/support-ticket-response';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  ticketText: z.string().min(10, 'Please enter at least 10 characters for the ticket text.'),
});

export function SupportForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<GenerateResponseOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResponse(null);
    try {
      const result = await generateResponse(values);
      setResponse(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Response",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ticketText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Support Ticket</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'My driver was late and the car was not clean...'"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Response
              </>
            )}
          </Button>
        </form>
      </Form>
      {response && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-lg">Suggested Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">{response.cannedResponseStart}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
