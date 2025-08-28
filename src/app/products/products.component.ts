import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  model: string;
  category: string;
  imageUrl: string;
  specifications: string[];
  price?: number;
  isNew?: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Industrial Motor Controller',
      model: 'IMC-X2000',
      category: 'Electrical',
      imageUrl: 'https://via.placeholder.com/300x200?text=Industrial+Motor+Controller',
      specifications: [
        'Input: 110-240V AC',
        'Output: 0-100V DC',
        'Max Current: 20A',
        'IP65 Rated'
      ],
      price: 249.99,
      isNew: true
    },
    {
      id: 2,
      name: 'Smart Temperature Sensor',
      model: 'STS-450',
      category: 'IoT Devices',
      imageUrl: 'https://via.placeholder.com/300x200?text=Smart+Temperature+Sensor',
      specifications: [
        'Wireless Connectivity',
        'Temperature Range: -40°C to 125°C',
        'Battery Life: 2 years',
        'Bluetooth 5.0'
      ],
      price: 79.99
    },
    {
      id: 3,
      name: 'Enterprise Dashboard',
      model: 'ED-360',
      category: 'Software Solutions',
      imageUrl: 'https://via.placeholder.com/300x200?text=Enterprise+Dashboard',
      specifications: [
        'Real-time Analytics',
        'Customizable Widgets',
        'Role-based Access',
        'Cloud Integration'
      ]
      // No price - will show "Price on Request"
    },
    {
      id: 4,
      name: 'Hydraulic Pump',
      model: 'HP-200',
      category: 'Mechanical',
      imageUrl: 'https://via.placeholder.com/300x200?text=Hydraulic+Pump',
      specifications: [
        'Flow Rate: 20 GPM',
        'Max Pressure: 3000 PSI',
        'Cast Iron Construction',
        'Self-priming'
      ],
      price: 1299.99
    }
  ];

  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.categories = [...new Set(this.products.map(p => p.category))];
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  addToEnquiry(product: Product) {
    // Implement your add to enquiry logic here
    console.log('Added to enquiry:', product);
    // You can add a service call here to handle the enquiry
    alert(`${product.name} has been added to your enquiry list.`);
  }
}
