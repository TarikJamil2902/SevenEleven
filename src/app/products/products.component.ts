import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  private readonly defaultWhatsAppNumber = '+8801910930410';
  
  // Component properties
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  categories: ProductCategory[] = ['Mechanical', 'Technical', 'Electrical'];
  selectedCategory: string = 'all';
  selectedProduct: Product | null = null;
  showProductModal = false;
  
  // Make Math available in template
  Math = Math;
  
  // Pagination settings
  currentPage: number = 1;
  itemsPerPage: number = 9; // Default items per page
  itemsPerPageOptions: number[] = [6, 9, 12, 24, 48]; // Options for items per page dropdown
  totalItems: number = 0;
  totalPages: number = 1;
  goToPageNumber: number | null = null;
  showGoToPage: boolean = false;

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
    },
    {
      id: 4,
      name: 'Heavy Duty Gear Reducer',
      model: 'HDR-500',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Robust gear reducer for industrial applications',
      specifications: [
        { key: 'Type', value: 'Helical-Bevel' },
        { key: 'Ratio', value: '15:1' },
        { key: 'Power', value: '20-150 HP' },
        { key: 'Material', value: 'Alloy Steel' }
      ],
      features: [
        'High load capacity',
        'Smooth operation',
        'Compact design',
        'Easy maintenance'
      ],
      price: 18500,
      isNew: false,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 5,
      name: 'Industrial Automation Controller',
      model: 'IAC-2000',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Advanced automation controller for industrial processes',
      specifications: [
        { key: 'Brand', value: 'Allen-Bradley' },
        { key: 'Inputs/Outputs', value: '32 DI/24 DO' },
        { key: 'Protocols', value: 'Ethernet/IP, Modbus TCP' },
        { key: 'Memory', value: '256 MB' }
      ],
      features: [
        'High-speed processing',
        'Dual Ethernet ports',
        'Expandable memory',
        'Industrial-grade components'
      ],
      price: 52000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 6,
      name: 'High-Torque Electric Motor',
      model: 'HTM-30KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Premium efficiency motor for heavy industrial use',
      specifications: [
        { key: 'Power', value: '30 KW' },
        { key: 'Voltage', value: '440V' },
        { key: 'Speed', value: '1750 RPM' },
        { key: 'Efficiency', value: 'IE4' }
      ],
      features: [
        'Premium efficiency',
        'Low vibration',
        'Thermal protection',
        'Drip-proof design'
      ],
      price: 22500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 7,
      name: 'Precision Gear Drive',
      model: 'PGD-350',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'High-precision gear drive for exacting applications',
      specifications: [
        { key: 'Type', value: 'Precision Helical' },
        { key: 'Ratio', value: '20:1' },
        { key: 'Power', value: '10-75 HP' },
        { key: 'Material', value: 'Hardened Steel' }
      ],
      features: [
        'High precision',
        'Low backlash',
        'Quiet operation',
        'Long service life'
      ],
      price: 21500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 8,
      name: 'Process Control System',
      model: 'PCS-5000',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Comprehensive process control solution for industrial automation',
      specifications: [
        { key: 'Brand', value: 'Siemens' },
        { key: 'Inputs/Outputs', value: '64 DI/48 DO' },
        { key: 'Protocols', value: 'PROFIBUS, OPC UA' },
        { key: 'Memory', value: '512 MB' }
      ],
      features: [
        'Redundant operation',
        'Web-based interface',
        'Advanced diagnostics',
        'Scalable architecture'
      ],
      price: 78000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 9,
      name: 'Explosion-Proof Motor',
      model: 'EPM-15KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Safe and reliable motor for hazardous environments',
      specifications: [
        { key: 'Power', value: '15 KW' },
        { key: 'Voltage', value: '380V' },
        { key: 'Speed', value: '2900 RPM' },
        { key: 'Protection', value: 'Ex d IIC T4' }
      ],
      features: [
        'Explosion-proof housing',
        'High starting torque',
        'Corrosion resistant',
        'ATEX certified'
      ],
      price: 32500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 10,
      name: 'Heavy Industrial Gearbox',
      model: 'HIG-1000',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Rugged gearbox for extreme industrial applications',
      specifications: [
        { key: 'Type', value: 'Planetary' },
        { key: 'Ratio', value: '25:1' },
        { key: 'Power', value: '50-300 HP' },
        { key: 'Material', value: 'Forged Steel' }
      ],
      features: [
        'High torque density',
        'Compact design',
        'Efficient power transmission',
        'Heavy-duty construction'
      ],
      price: 42500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 11,
      name: 'Motion Controller',
      model: 'MC-300',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'High-precision motion control system',
      specifications: [
        { key: 'Brand', value: 'Omron' },
        { key: 'Axes', value: '8' },
        { key: 'Protocols', value: 'EtherCAT, CANopen' },
        { key: 'Memory', value: '1 GB' }
      ],
      features: [
        'Nanosecond precision',
        'Multi-axis synchronization',
        'Advanced trajectory planning',
        'Real-time monitoring'
      ],
      price: 65000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 12,
      name: 'Variable Speed Drive Motor',
      model: 'VSD-18.5KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Energy efficient motor with variable speed control',
      specifications: [
        { key: 'Power', value: '18.5 KW' },
        { key: 'Voltage', value: '400V' },
        { key: 'Speed', value: '100-3000 RPM' },
        { key: 'Efficiency', value: 'IE5' }
      ],
      features: [
        'Wide speed range',
        'Energy saving',
        'Soft start capability',
        'Built-in protection'
      ],
      price: 24500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 13,
      name: 'Right-Angle Gear Drive',
      model: 'RAG-200',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Compact right-angle gear drive for space-constrained applications',
      specifications: [
        { key: 'Type', value: 'Worm' },
        { key: 'Ratio', value: '30:1' },
        { key: 'Power', value: '5-40 HP' },
        { key: 'Material', value: 'Aluminum Housing' }
      ],
      features: [
        '90° output',
        'Lightweight',
        'Maintenance-free',
        'High efficiency'
      ],
      price: 18500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 14,
      name: 'Distributed Control System',
      model: 'DCS-8000',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Enterprise-grade distributed control system',
      specifications: [
        { key: 'Brand', value: 'Emerson' },
        { key: 'I/O Capacity', value: 'Unlimited' },
        { key: 'Protocols', value: 'HART, FOUNDATION Fieldbus' },
        { key: 'Redundancy', value: 'Yes' }
      ],
      features: [
        'Fault-tolerant architecture',
        'Advanced process control',
        'Cybersecurity features',
        'Scalable design'
      ],
      price: 125000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 15,
      name: 'Submersible Pump Motor',
      model: 'SPM-11KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Heavy-duty submersible motor for pump applications',
      specifications: [
        { key: 'Power', value: '11 KW' },
        { key: 'Voltage', value: '415V' },
        { key: 'Speed', value: '2850 RPM' },
        { key: 'Protection', value: 'IP68' }
      ],
      features: [
        'Waterproof design',
        'Stainless steel shaft',
        'Thermal protection',
        'Long lifespan'
      ],
      price: 32500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 16,
      name: 'Heavy Industrial Gearbox',
      model: 'HIG-2000',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Heavy-duty industrial gearbox for mining applications',
      specifications: [
        { key: 'Type', value: 'Parallel Shaft' },
        { key: 'Ratio', value: '40:1' },
        { key: 'Power', value: '100-500 HP' },
        { key: 'Material', value: 'Alloy Steel' }
      ],
      features: [
        'Extreme load capacity',
        'Dust-proof design',
        'High efficiency',
        'Maintenance-friendly'
      ],
      price: 68500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 17,
      name: 'Safety PLC System',
      model: 'SPS-1200',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Safety-rated programmable logic controller',
      specifications: [
        { key: 'Brand', value: 'Siemens' },
        { key: 'Safety Level', value: 'SIL 3' },
        { key: 'Protocols', value: 'PROFIsafe' },
        { key: 'Response Time', value: '< 10ms' }
      ],
      features: [
        'Fail-safe operation',
        'Self-diagnostics',
        'Redundant processing',
        'TÜV certified'
      ],
      price: 45000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 18,
      name: 'Brake Motor',
      model: 'BM-7.5KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Three-phase motor with integrated brake',
      specifications: [
        { key: 'Power', value: '7.5 KW' },
        { key: 'Voltage', value: '400V' },
        { key: 'Speed', value: '1420 RPM' },
        { key: 'Brake Type', value: 'DC Spring' }
      ],
      features: [
        'Instant braking',
        'Maintenance-free',
        'Manual release',
        'Compact design'
      ],
      price: 18500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 19,
      name: 'Planetary Gearbox',
      model: 'PG-100',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'High-precision planetary gearbox for servo applications',
      specifications: [
        { key: 'Type', value: 'Planetary' },
        { key: 'Ratio', value: '10:1' },
        { key: 'Torque', value: '500 Nm' },
        { key: 'Backlash', value: '< 3 arcmin' }
      ],
      features: [
        'High torsional stiffness',
        'Low noise',
        'High efficiency',
        'Precision ground gears'
      ],
      price: 32500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 20,
      name: 'Remote I/O System',
      model: 'RIO-2000',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Distributed I/O system for industrial automation',
      specifications: [
        { key: 'Brand', value: 'Rockwell' },
        { key: 'I/O Points', value: 'Up to 1024' },
        { key: 'Protocol', value: 'EtherNet/IP' },
        { key: 'Update Time', value: '1 ms' }
      ],
      features: [
        'Hot-swappable modules',
        'Dual-port switch',
        'Diagnostic LEDs',
        'Tool-free wiring'
      ],
      price: 35000,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 21,
      name: 'High-Speed Spindle Motor',
      model: 'HSS-15KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Precision spindle motor for CNC applications',
      specifications: [
        { key: 'Power', value: '15 KW' },
        { key: 'Speed', value: '24000 RPM' },
        { key: 'Cooling', value: 'Water' },
        { key: 'Bearing Type', value: 'Ceramic' }
      ],
      features: [
        'High rotational accuracy',
        'Water-cooled',
        'Low vibration',
        'Long service life'
      ],
      price: 42500,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 22,
      name: 'Bevel Gearbox',
      model: 'BG-150',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Right-angle bevel gearbox for power transmission',
      specifications: [
        { key: 'Type', value: 'Bevel' },
        { key: 'Ratio', value: '2:1' },
        { key: 'Power', value: '5-50 HP' },
        { key: 'Efficiency', value: '98%' }
      ],
      features: [
        '90° power transmission',
        'Compact design',
        'High efficiency',
        'Maintenance-free'
      ],
      price: 18500,
      isNew: false,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 23,
      name: 'HMI Panel',
      model: 'HMI-15',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Industrial HMI panel for machine control',
      specifications: [
        { key: 'Brand', value: 'Siemens' },
        { key: 'Screen Size', value: '15.6"' },
        { key: 'Resolution', value: '1920x1080' },
        { key: 'Protection', value: 'IP65' }
      ],
      features: [
        'Capacitive touch',
        'High brightness',
        'Wide temperature range',
        'Multiple communication ports'
      ],
      price: 28500,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 24,
      name: 'Foot Mounted Motor',
      model: 'FMM-5.5KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Standard foot mounted induction motor',
      specifications: [
        { key: 'Power', value: '5.5 KW' },
        { key: 'Voltage', value: '415V' },
        { key: 'Speed', value: '1440 RPM' },
        { key: 'Mounting', value: 'B3' }
      ],
      features: [
        'Energy efficient',
        'Rugged construction',
        'Low noise',
        'Easy maintenance'
      ],
      price: 12500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 25,
      name: 'Helical Gear Reducer',
      model: 'HGR-300',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'High-efficiency helical gear reducer',
      specifications: [
        { key: 'Type', value: 'Helical' },
        { key: 'Ratio', value: '15:1' },
        { key: 'Torque', value: '2000 Nm' },
        { key: 'Efficiency', value: '96%' }
      ],
      features: [
        'High torque capacity',
        'Smooth operation',
        'Low noise',
        'Long service life'
      ],
      price: 28500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 26,
      name: 'I/O Module',
      model: 'IOM-16D16R',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Digital input/output module for PLC systems',
      specifications: [
        { key: 'Inputs', value: '16 DI' },
        { key: 'Outputs', value: '16 Relay' },
        { key: 'Voltage', value: '24V DC' },
        { key: 'Isolation', value: '3000V' }
      ],
      features: [
        'LED status indicators',
        'Removable terminal blocks',
        'Short-circuit protection',
        'Hot-swappable'
      ],
      price: 12500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 27,
      name: 'Brake Motor with Encoder',
      model: 'BME-3KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Precision motor with brake and encoder',
      specifications: [
        { key: 'Power', value: '3 KW' },
        { key: 'Voltage', value: '400V' },
        { key: 'Encoder', value: '1024 PPR' },
        { key: 'Brake Voltage', value: '24V DC' }
      ],
      features: [
        'High-resolution encoder',
        'Spring-applied brake',
        'Thermal protection',
        'IP65 protection'
      ],
      price: 22500,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 28,
      name: 'Worm Gear Reducer',
      model: 'WGR-100',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Compact worm gear reducer for space-constrained applications',
      specifications: [
        { key: 'Type', value: 'Worm' },
        { key: 'Ratio', value: '30:1' },
        { key: 'Power', value: '0.5-15 HP' },
        { key: 'Efficiency', value: '85%' }
      ],
      features: [
        'Right-angle output',
        'Self-locking',
        'Quiet operation',
        'Maintenance-free'
      ],
      price: 12500,
      isNew: false,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 29,
      name: 'Safety Relay Module',
      model: 'SRM-4',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Safety relay for emergency stop circuits',
      specifications: [
        { key: 'Channels', value: '4' },
        { key: 'Safety Category', value: '4/PL e' },
        { key: 'Voltage', value: '24V DC' },
        { key: 'Contacts', value: '4 NO' }
      ],
      features: [
        'Dual-channel monitoring',
        'Cross-fault detection',
        'LED diagnostics',
        'Tool-free wiring'
      ],
      price: 8500,
      whatsappNumber: '+8801712345678',
      isNew: true
    },
    {
      id: 30,
      name: 'Flange Mounted Motor',
      model: 'FMM-11KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Heavy-duty flange mounted motor',
      specifications: [
        { key: 'Power', value: '11 KW' },
        { key: 'Voltage', value: '415V' },
        { key: 'Speed', value: '1455 RPM' },
        { key: 'Mounting', value: 'B5' }
      ],
      features: [
        'Rugged construction',
        'High starting torque',
        'Thermal protection',
        'Low vibration'
      ],
      price: 18500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 31,
      name: 'Planetary Gear Motor',
      model: 'PGM-750W',
      category: 'Mechanical',
      imageUrl: 'assets/images/gearbox.jpg',
      description: 'Compact planetary gear motor with high torque',
      specifications: [
        { key: 'Type', value: 'Planetary' },
        { key: 'Ratio', value: '10:1' },
        { key: 'Power', value: '750W' },
        { key: 'Output Speed', value: '150 RPM' }
      ],
      features: [
        'High torque density',
        'Precision gearing',
        'Low backlash',
        'Maintenance-free'
      ],
      price: 22500,
      isNew: true,
      whatsappNumber: '+8801910930410'
    },
    {
      id: 32,
      name: 'Ethernet Switch',
      model: 'ES-8P',
      category: 'Technical',
      imageUrl: 'assets/images/controller.jpg',
      description: 'Industrial Ethernet switch for harsh environments',
      specifications: [
        { key: 'Ports', value: '8 x 10/100' },
        { key: 'Redundancy', value: 'Yes' },
        { key: 'Power Input', value: '24V DC' },
        { key: 'Protection', value: 'IP40' }
      ],
      features: [
        'DIN-rail mountable',
        'Wide temperature range',
        'Plug-and-play',
        'LED indicators'
      ],
      price: 18500,
      whatsappNumber: '+8801712345678',
      isNew: false
    },
    {
      id: 33,
      name: 'Inverter Duty Motor',
      model: 'IDM-22KW',
      category: 'Electrical',
      imageUrl: 'assets/images/motor.jpg',
      description: 'Premium efficiency motor for VFD applications',
      specifications: [
        { key: 'Power', value: '22 KW' },
        { key: 'Voltage', value: '400V' },
        { key: 'Speed', value: '1475 RPM' },
        { key: 'Insulation', value: 'Class F' }
      ],
      features: [
        'Inverter duty rated',
        'Insulated bearings',
        'Low noise',
        'High efficiency'
      ],
      price: 32500,
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
    // Initialize with all products
    this.allProducts = [...this.products];
    this.totalItems = this.products.length;
    this.calculateTotalPages();
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
    this.currentPage = 1; // Reset to first page when changing category
    
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
    
    this.totalItems = this.filteredProducts.length;
    this.calculateTotalPages();
    this.updateDisplayedProducts();
  }
  
  // Calculate total pages based on filtered products
  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) || 1;
  }
  
  // Update the currently displayed products based on pagination
  private updateDisplayedProducts() {
    // Filter products by category first
    const filtered = this.allProducts.filter(product => 
      this.selectedCategory === 'all' || product.category === this.selectedCategory
    );
    
    // Update total items and pages
    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) || 1;
    
    // Ensure current page is within bounds
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    
    // Calculate pagination range
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    // Slice the filtered products
    this.filteredProducts = filtered.slice(startIndex, endIndex);
  }
  
  // Change items per page
  onItemsPerPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(select.value);
    this.currentPage = 1; // Reset to first page
    this.updateDisplayedProducts();
  }
  
  // Toggle go to page input
  toggleGoToPage() {
    this.showGoToPage = !this.showGoToPage;
    if (this.showGoToPage) {
      this.goToPageNumber = this.currentPage;
      // Focus the input after it's shown
      setTimeout(() => {
        const input = document.getElementById('goToPageInput') as HTMLInputElement;
        if (input) input.select();
      }, 0);
    }
  }
  
  // Handle go to page form submission
  goToPage() {
    if (this.goToPageNumber && this.goToPageNumber >= 1 && this.goToPageNumber <= this.totalPages) {
      this.onPageChange(this.goToPageNumber);
      this.showGoToPage = false;
    }
  }
  
  // Handle page change
  onPageChange(page: number | string) {
    if (typeof page !== 'number' || page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedProducts();
    // Scroll to top of products section
    document.querySelector('.products-container')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Generate page numbers for pagination with ellipsis
  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5; // Maximum number of page numbers to show
    
    if (this.totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      // Calculate start and end page numbers
      let startPage = Math.max(2, this.currentPage - 1);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if we're at the start or end
      if (this.currentPage <= 3) {
        endPage = 3;
      } else if (this.currentPage >= this.totalPages - 2) {
        startPage = this.totalPages - 2;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < this.totalPages - 1) {
        pages.push('...');
      }
      
      // Add last page
      pages.push(this.totalPages);
    }
    
    return pages;
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
