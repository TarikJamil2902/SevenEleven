import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

export interface Order {
  id: string;
  customer: string;
  product: string;
  date: Date;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed' | string;
}

interface DashboardStats {
  orders: number;
  revenue: number;
  users: number;
  products: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  
  private salesChart?: Chart;
  private revenueChart?: Chart;

  stats: DashboardStats = {
    orders: 1254,
    revenue: 28450.75,
    users: 842,
    products: 156
  };

  recentOrders: Order[] = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Premium Plan', date: new Date(), amount: 99.99, status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Basic Plan', date: new Date(), amount: 49.99, status: 'Pending' },
    { id: '#ORD-003', customer: 'Bob Johnson', product: 'Pro Plan', date: new Date(), amount: 199.99, status: 'Completed' },
    { id: '#ORD-004', customer: 'Alice Brown', product: 'Basic Plan', date: new Date(), amount: 49.99, status: 'Failed' },
    { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Premium Plan', date: new Date(), amount: 99.99, status: 'Completed' }
  ];

  displayedColumns: string[] = ['orderId', 'customer', 'product', 'date', 'amount', 'status'];
  loading: boolean = false;
  error: string | null = null;
  lastUpdated: Date = new Date();

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  ngOnDestroy(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
  }

  private initCharts(): void {
    this.initSalesChart();
    this.initRevenueChart();
  }

  private initSalesChart(): void {
    const salesCtx = this.salesChartRef?.nativeElement.getContext('2d');
    if (!salesCtx) return;

    this.salesChart = new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#3f51b5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3f51b5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { 
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: { 
            grid: { display: false }
          }
        }
      }
    });
  }

  private initRevenueChart(): void {
    const revenueCtx = this.revenueChartRef?.nativeElement.getContext('2d');
    if (!revenueCtx) return;

    this.revenueChart = new Chart(revenueCtx, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Referral', 'Social', 'Organic'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#3f51b5', '#4caf50', '#ff9800', '#e91e63'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          }
        }
      }
    });
  }

  private loadDashboardData(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    const revenueCtx = this.revenueChartRef?.nativeElement.getContext('2d');
    if (revenueCtx) {
      this.revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Referral', 'Social', 'Organic'],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
              '#3f51b5',
              '#4caf50',
              '#ff9800',
              '#e91e63'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            }
          }
        }
      });
    }
  }

  logout(): void {
    this.router.navigate(['/admin/login']);
  }

  viewAllOrders(): void {
    this.router.navigate(['/admin/orders']);
  }
}