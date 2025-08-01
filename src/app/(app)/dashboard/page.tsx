"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/date-range-picker"
import { BarChart, Users, Wallet, Car } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "January", revenue: 12345 },
  { month: "February", revenue: 15678 },
  { month: "March", revenue: 18901 },
  { month: "April", revenue: 21234 },
  { month: "May", revenue: 25567 },
  { month: "June", revenue: 28901 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

const recentBookings = [
    { id: 'BK001', customer: 'Alice Johnson', pickup: '123 Main St', dropoff: '456 Oak Ave', fare: '$25.50', status: 'Completed' },
    { id: 'BK002', customer: 'Bob Williams', pickup: '789 Pine Ln', dropoff: '101 Maple Dr', fare: '$15.00', status: 'Completed' },
    { id: 'BK003', customer: 'Charlie Brown', pickup: '212 Elm St', dropoff: '333 Birch Rd', fare: '$45.75', status: 'In Progress' },
    { id: 'BK004', customer: 'Diana Prince', pickup: '454 Spruce Ave', dropoff: '565 Cedar Ct', fare: '$32.20', status: 'Completed' },
    { id: 'BK005', customer: 'Ethan Hunt', pickup: '787 Willow Way', dropoff: '898 Aspen Pl', fare: '$18.90', status: 'Cancelled' },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+19 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cabs</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+128</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsBarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `$${value / 1000}K`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>You made 265 bookings this month.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Fare</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentBookings.slice(0,5).map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.customer}</TableCell>
                            <TableCell>{booking.fare}</TableCell>
                            <TableCell>
                                <Badge variant={booking.status === 'Completed' ? 'default' : booking.status === 'In Progress' ? 'secondary' : 'destructive'} className="capitalize">{booking.status.toLowerCase()}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
