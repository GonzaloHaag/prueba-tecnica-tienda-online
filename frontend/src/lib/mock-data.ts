export interface Sale {
  id: string;
  productName: string;
  customerEmail: string;
  amount: number;
  quantity: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface MonthlySales {
  month: string;
  sales: number;
  revenue: number;
  orders: number;
}

export interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  monthlyGrowth: number;
  monthlyData: MonthlySales[];
  recentSales: Sale[];
}

export const mockSalesData: SalesStats = {
  totalSales: 1247,
  totalRevenue: 45678.90,
  monthlyGrowth: 8.2,
  monthlyData: [
    {
      month: "Enero",
      sales: 156,
      revenue: 5840.50,
      orders: 156
    },
    {
      month: "Febrero", 
      sales: 189,
      revenue: 7120.30,
      orders: 189
    },
    {
      month: "Marzo",
      sales: 234,
      revenue: 8920.80,
      orders: 234
    },
    {
      month: "Abril",
      sales: 198,
      revenue: 7450.20,
      orders: 198
    },
    {
      month: "Mayo",
      sales: 267,
      revenue: 10250.60,
      orders: 267
    },
    {
      month: "Junio",
      sales: 203,
      revenue: 8096.50,
      orders: 203
    },
    {
      month: "Julio",
      sales: 245,
      revenue: 9200.00,
      orders: 245
    }
  ],
  recentSales: [
    {
      id: "1",
      productName: "Remera Premium",
      customerEmail: "cliente1@email.com",
      amount: 40.00,
      quantity: 1,
      date: "2024-01-15T10:30:00Z",
      status: "completed"
    },
    {
      id: "2",
      productName: "Zapatillas Sport",
      customerEmail: "cliente2@email.com",
      amount: 60.00,
      quantity: 1,
      date: "2024-01-15T09:15:00Z",
      status: "completed"
    },
    {
      id: "3",
      productName: "Pantalón Clásico",
      customerEmail: "cliente3@email.com",
      amount: 40.00,
      quantity: 1,
      date: "2024-01-15T08:45:00Z",
      status: "completed"
    },
    {
      id: "4",
      productName: "Campera Invierno",
      customerEmail: "cliente4@email.com",
      amount: 80.00,
      quantity: 1,
      date: "2024-01-15T08:20:00Z",
      status: "pending"
    },
    {
      id: "5",
      productName: "Remera Básica",
      customerEmail: "cliente5@email.com",
      amount: 20.00,
      quantity: 2,
      date: "2024-01-15T07:55:00Z",
      status: "completed"
    },
    {
      id: "6",
      productName: "Zapatillas Sport",
      customerEmail: "cliente6@email.com",
      amount: 60.00,
      quantity: 1,
      date: "2024-01-15T07:30:00Z",
      status: "completed"
    },
    {
      id: "7",
      productName: "Remera Premium",
      customerEmail: "cliente7@email.com",
      amount: 40.00,
      quantity: 1,
      date: "2024-01-15T07:10:00Z",
      status: "cancelled"
    },
    {
      id: "8",
      productName: "Pantalón Clásico",
      customerEmail: "cliente8@email.com",
      amount: 40.00,
      quantity: 1,
      date: "2024-01-15T06:45:00Z",
      status: "completed"
    }
  ]
};