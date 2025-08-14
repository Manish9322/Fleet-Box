
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
import { BarChart, Users, Wallet, Car, PieChart as PieChartIcon } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts"

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

const bookingStatusData = [
    { name: 'Completed', value: 1850, fill: 'hsl(var(--chart-1))' },
    { name: 'In Progress', value: 250, fill: 'hsl(var(--chart-2))' },
    { name: 'Scheduled', value: 150, fill: 'hsl(var(--chart-3))' },
    { name: 'Cancelled', value: 100, fill: 'hsl(var(--chart-4))' },
];

const cabStatusData = [
    { name: 'Available', value: 85, fill: 'hsl(var(--chart-1))' },
    { name: 'Booked', value: 28, fill: 'hsl(var(--chart-2))' },
    { name: 'Maintenance', value: 15, fill: 'hsl(var(--chart-5))' },
]


const recentBookings = [
    { id: 'BK001', customer: 'Harshal Mutadak', pickup: 'Seawoods Grand Central', dropoff: 'Inorbit Mall, Vashi', fare: '₹350', status: 'Completed' },
    { id: 'BK002', customer: 'Shubham Vanarse', pickup: 'Kharghar Valley Golf Course', dropoff: 'Utsav Chowk, Kharghar', fare: '₹200', status: 'Completed' },
    { id: 'BK003', customer: 'Aarav Sharma', pickup: 'DY Patil Stadium, Nerul', dropoff: 'Belapur CBD', fare: '₹275', status: 'In Progress' },
    { id: 'BK004', customer: 'Priya Patel', pickup: 'Vashi Railway Station', dropoff: 'Palm Beach Road', fare: '₹180', status: 'Completed' },
    { id: 'BK005', customer: 'Rohan Mehta', pickup: 'Airoli Knowledge Park', dropoff: 'Ghansoli', fare: '₹220', status: 'Cancelled' },
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
            <div className="text-2xl font-bold">₹4,52,318.89</div>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>A summary of your recent revenue.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `₹${value / 1000}K`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>You made 265 bookings this month.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Fare</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentBookings.slice(0,5).map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell>
                                  <div className="font-medium">{booking.customer}</div>
                                </TableCell>
                                <TableCell className="text-right">{booking.fare}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={booking.status === 'Completed' ? 'default' : booking.status === 'In Progress' ? 'secondary' : 'destructive'} className="capitalize">{booking.status.toLowerCase()}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
              </CardContent>
            </Card>
        </div>
         <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bookings by Status</CardTitle>
                    <CardDescription>A breakdown of all customer bookings by their current status.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{}} className="h-[300px] w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie data={bookingStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                 {bookingStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                             <Legend />
                        </PieChart>
                     </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Cab Status Overview</CardTitle>
                    <CardDescription>Current status of all cabs in the fleet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie data={cabStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                                {cabStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
         </div>
      </div>
    </div>
  )
}
