import { Component, OnInit } from '@angular/core';

type ProjectCategory = 'ongoing' | 'completed';
type FilterCategory = 'all' | ProjectCategory;

interface Project {
  id: number;
  title: string;
  client: string;
  category: ProjectCategory;
  imageUrl: string;
  duration: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  features?: string[];
  gallery?: string[];
  challenges?: string;
  solution?: string;
  results?: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  selectedProject: Project | null = null;
  activeImageIndex: number = 0;
  showProjectModal: boolean = false;
  activeFilter: FilterCategory = 'all';
  selectedCategory: FilterCategory = 'all';
  projects: Project[] = [];
  
  constructor() {
    // Initialize projects data
    this.projects = [
    {
      id: 1,
      title: 'Smart Factory Automation',
      client: 'TechIndustries Ltd.',
      category: 'completed',
      imageUrl: 'assets/images/project1.jpg',
      duration: 'Jan 2023 - Jun 2023',
      description: 'Implemented a comprehensive automation solution for their manufacturing plant, reducing production time by 35% and minimizing human error.',
      technologies: ['PLC Programming', 'SCADA', 'Industrial IoT', 'Robotics'],
      testimonial: {
        text: 'The automation solution transformed our production line. Highly recommended!',
        author: 'John Smith',
        position: 'Plant Manager',
        company: 'TechIndustries Ltd.'
      },
      gallery: [
        'assets/images/project2.jpg',
        'assets/images/project1.jpg',
        'assets/images/project3.avif'
      ],
      challenges: 'The client faced challenges with production delays and quality control issues due to manual processes.',
      solution: 'We implemented an automated production line with IoT sensors and real-time monitoring to optimize the manufacturing process.',
      results: 'Reduced production time by 35%, improved product quality by 27%, and decreased operational costs by 18%.',
      features: [
        'Automated production line',
        'Real-time monitoring',
        'Predictive maintenance',
        'Quality control automation'
      ]
    },
    {
      id: 2,
      title: 'Energy Management System',
      client: 'GreenEnergy Solutions',
      category: 'ongoing',
      imageUrl: 'assets/images/project3.avif',
      duration: 'Mar 2023 - Present',
      description: 'Developing a smart energy management system to optimize power consumption across multiple facilities using AI and machine learning algorithms.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'TensorFlow'],
      gallery: [
        'assets/images/project3.avif',
        'assets/images/project3.avif',
        'assets/images/project3.avif'
      ],
      challenges: 'The client needed a solution to monitor and optimize energy consumption across multiple facilities with varying power requirements.',
      solution: 'We developed a centralized energy management platform with real-time monitoring, predictive analytics, and automated control systems.',
      results: 'Achieved 25% reduction in energy costs and 30% improvement in energy efficiency across all monitored facilities.',
      features: [
        'Real-time energy monitoring',
        'Predictive analytics',
        'Automated load balancing',
        'Customizable dashboards',
        'Anomaly detection'
      ]
    },
    {
      id: 3,
      title: 'Industrial Robotics Upgrade',
      client: 'AutoMech Industries',
      category: 'completed',
      imageUrl: 'assets/images/project3.avif',
      duration: 'Nov 2022 - Jan 2023',
      description: 'Upgraded legacy robotic systems with modern automation and machine vision capabilities for improved precision and efficiency.',
      technologies: ['ROS', 'Python', 'OpenCV', 'TensorFlow'],
      gallery: [
        'assets/images/project3.avif',
        'assets/images/project3.avif',
        'assets/images/project3.avif'
      ],
      challenges: 'The client was using outdated robotic systems that were inefficient and required frequent maintenance.',
      solution: 'We modernized their robotics infrastructure with advanced machine vision and AI capabilities.',
      results: 'Increased production line efficiency by 45% and reduced error rates by 60%.',
      features: [
        'Machine vision integration',
        'Predictive maintenance',
        'Automated quality control',
        'Real-time monitoring',
        'Remote operation capabilities'
      ]
    },
    {
      id: 4,
      title: 'Smart City IoT Network',
      client: 'Metro City Council',
      category: 'completed',
      imageUrl: 'assets/images/project2.jpg',
      duration: 'Sep 2022 - Feb 2023',
      description: 'Deployed a city-wide IoT network for smart lighting, waste management, and traffic monitoring systems.',
      technologies: ['LoRaWAN', 'Python', 'React', 'AWS IoT Core'],
      gallery: [
        'assets/images/project2.jpg',
        'assets/images/project2.jpg',
        'assets/images/project2.jpg'
      ],
      challenges: 'The city needed an integrated solution to manage urban infrastructure efficiently while reducing operational costs.',
      solution: 'We implemented a comprehensive IoT network connecting various city services with a centralized management platform.',
      results: 'Reduced energy consumption by 40% for street lighting and improved waste collection efficiency by 50%.',
      features: [
        'Smart street lighting',
        'Waste level monitoring',
        'Traffic flow optimization',
        'Air quality monitoring',
        'Centralized dashboard'
      ]
    },
    {
      id: 5,
      title: 'Renewable Energy Monitoring',
      client: 'SunPower Energies',
      category: 'ongoing',
      imageUrl: 'assets/images/project1.jpg',
      duration: 'May 2023 - Present',
      description: 'Creating a real-time monitoring system for solar and wind energy production with predictive maintenance features.',
      technologies: ['React', 'Django', 'InfluxDB', 'Grafana'],
      gallery: [
        'assets/images/project1.jpg',
        'assets/images/project1.jpg',
        'assets/images/project1.jpg'
      ],
      challenges: 'Difficulty in monitoring and maintaining distributed renewable energy installations across remote locations.',
      solution: 'Developed a comprehensive monitoring platform with predictive analytics for optimal energy production.',
      results: 'Improved energy output by 15% and reduced maintenance costs by 30% through predictive maintenance.',
      features: [
        'Real-time energy production tracking',
        'Predictive maintenance alerts',
        'Performance analytics',
        'Weather integration',
        'Custom reporting'
      ],
     testimonial: {
        text: 'The monitoring system has given us unprecedented visibility into our renewable assets.',
        author: 'Sarah Johnson',
        position: 'CTO',
        company: 'EcoPower Inc.'
      }
    },
    {
      id: 6,
      title: 'Healthcare Data Analytics Platform',
      client: 'MediCare Systems',
      category: 'ongoing',
      imageUrl: 'assets/images/5.jpg',
      duration: 'May 2023 - Present',
      description: 'Building a secure, HIPAA-compliant data analytics platform for healthcare providers to analyze patient data, treatment outcomes, and operational efficiency.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    }
    ];
  }

  categories: FilterCategory[] = ['all', 'ongoing', 'completed'];
  
  // Open project modal with selected project
  openProjectModal(project: Project, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedProject = project;
    this.activeImageIndex = 0;
    this.showProjectModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  ngOnInit(): void {
    // Component initialization logic can go here
  }

  closeProjectModal(): void {
    this.showProjectModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    if (this.selectedProject?.gallery) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.selectedProject.gallery.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject?.gallery) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.selectedProject.gallery.length) % this.selectedProject.gallery.length;
    }
  }

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeFilter);
  }

  setFilter(filter: FilterCategory): void {
    this.activeFilter = filter;
  }

  getProjectCount(category: FilterCategory): number {
    if (category === 'all') {
      return this.projects.length;
    }
    return this.projects.filter(project => project.category === category).length;
  }

  toTitleCase(str: string | undefined): string {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  filterProjects(category: FilterCategory): void {
    this.activeFilter = category;
  }

  
  // View project details (alias for openProjectModal for backward compatibility)
  viewProjectDetails(project: Project) {
    this.openProjectModal(project);
  }
}
