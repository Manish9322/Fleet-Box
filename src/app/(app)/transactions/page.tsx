import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";

const transactions = [
    { id: 'TRN001', bookingId: 'BK001', date: '2023-10-26', amount: '$25.50', type: 'Card', status: 'Completed' },
    { id: 'TRN002', bookingId: 'BK002', date: '2023-10-25', amount: '$15.00', type: 'Cash', status: 'Completed' },
    { id: 'TRN003', bookingId: 'BK003', date: '2023-10-25', amount: '$45.75', type: 'Card', status: 'Pending' },
    { id: 'TRN004', bookingId: 'BK004', date: '2023-10-24', amount: '$32.20', type: 'Card', status: 'Completed' },
    { id: 'TRN005', bookingId: 'BK005', date: '2023-10-24', amount: '$0.00', type: 'N/A', status: 'Refunded' },
    { id: 'TRN006', bookingId: 'BK006', date: '2023-10-23', amount: '$55.00', type: 'Card', status: 'Completed' },
];

export default function TransactionsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Transaction Log</CardTitle>
            <CardDescription>
              Review all financial transactions.
            </CardDescription>
          </div>
          <DateRangePicker />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono">{transaction.id}</TableCell>
                <TableCell className="font-mono">{transaction.bookingId}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      transaction.status === "Completed"
                        ? "default"
                        : transaction.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {transaction.status.toLowerCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
