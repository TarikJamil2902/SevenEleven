import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

type ProductCategory = 'Mechanical' | 'Technical' | 'Electrical';

interface Product {
  id: number;
  name: string;
  model: string;
  category: ProductCategory;
  imageUrl: string;
  specifications: Array<{ key: string; value: string }>;
  features: string[];
  price: number | 'Price on Request';
  isNew?: boolean;
  whatsappNumber: string;
  description: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private readonly defaultWhatsAppNumber = '+8801910930410';
  
  filteredProducts: Product[] = [];
  categories: ProductCategory[] = ['Mechanical', 'Technical', 'Electrical'];
  selectedCategory: string = 'all';
  selectedProduct: Product | null = null;
  showProductModal = false;

  // Products array with relative paths
  products: Product[] = [
    {
      id: 1,
      name: 'Industrial Gearbox',
      model: 'IGB-750',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'High-performance industrial gearbox for heavy machinery applications',
      specifications: [
        { key: 'Type', value: 'Helical' },
        { key: 'Ratio', value: '10:1' },
        { key: 'Power', value: '15-100 HP' },
        { key: 'Material', value: 'Cast Iron' }
      ],
      features: [
        'High torque capacity',
        'Low noise operation',
        'Maintenance-free',
        'Long service life'
      ],
      price: 12500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 2,
      name: 'Programmable Logic Controller',
      model: 'PLC-S7-1200',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Advanced PLC for industrial automation and control systems',
      specifications: [
        { key: 'Brand', value: 'Siemens' },
        { key: 'Inputs/Outputs', value: '24 DI/16 DO' },
        { key: 'Protocols', value: 'PROFINET, Modbus' },
        { key: 'Memory', value: '100 KB' }
      ],
      features: [
        'High-speed processing',
        'Ethernet connectivity',
        'Expandable I/O',
        'Robust industrial design'
      ],
      price: 45000,
      whatsappNumber: '+8801712345678'
    },
    {
      id: 3,
      name: '3-Phase Induction Motor',
      model: 'IM-22KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'High-efficiency three-phase induction motor for industrial use',
      specifications: [
        { key: 'Power', value: '22 KW' },
        { key: 'Voltage', value: '415V' },
        { key: 'Speed', value: '1440 RPM' },
        { key: 'Efficiency', value: 'IE3' }
      ],
      features: [
        'Energy efficient',
        'Low maintenance',
        'Durable construction',
        'Thermal protection'
      ],
      price: 18500,
      whatsappNumber: '+8801712345678',
      isNew: true
    }
  ];

  private defaultProduct: Product = {
    id: 0,
    name: 'No Product',
    model: '-',
    category: 'Mechanical',
    imageUrl: 'assets/images/placeholder.svg',
    description: 'No description available.',
    specifications: [],
    features: [],
    price: 0,
    isNew: false,
    whatsappNumber: this.defaultWhatsAppNumber
  };

  constructor() { }

  ngOnInit() {
    this.filterProducts('all');
  }

  formatPrice(price: number | string): string {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    return price;
  }

  filterProducts(category: string | ProductCategory) {
    this.selectedCategory = category as string;
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  openProductModal(product: Product, event?: Event) {
    if (event) event.stopPropagation();
    this.selectedProduct = product || this.defaultProduct;
    this.showProductModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeProductModal() {
    this.showProductModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  addToEnquiry(product: Product) {
    alert(`${product.name} has been added to your enquiry list.`);
  }

  contactViaWhatsApp(product: Product, event?: Event) {
    if (event) event.stopPropagation();
    const phoneNumber = product.whatsappNumber || this.defaultWhatsAppNumber;
    const message = `Hi, I'm interested in your ${product.name} (${product.model}). Please provide more info.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultProduct.imageUrl;
  }
}
