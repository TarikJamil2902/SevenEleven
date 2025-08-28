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
  technologies: string[];
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
  projects: Project[] = [
    {
      id: 1,
      title: 'Smart Factory Automation',
      client: 'TechIndustries Ltd.',
      category: 'completed',
      imageUrl: 'https://via.placeholder.com/800x500?text=Smart+Factory+Automation',
      duration: 'Jan 2023 - Jun 2023',
      description: 'Implemented a comprehensive automation solution for their manufacturing plant, reducing production time by 35% and minimizing human error.',
      technologies: ['PLC Programming', 'SCADA', 'Industrial IoT', 'Robotics'],
      testimonial: {
        text: 'The automation solution transformed our production line. Highly recommended!',
        author: 'John Smith',
        position: 'Plant Manager',
        company: 'TechIndustries Ltd.'
      }
    },
    {
      id: 2,
      title: 'Energy Management System',
      client: 'GreenEnergy Solutions',
      category: 'ongoing',
      imageUrl: 'https://via.placeholder.com/800x500?text=Energy+Management+System',
      duration: 'Mar 2023 - Present',
      description: 'Developing a smart energy management system to optimize power consumption across multiple facilities using AI and machine learning algorithms.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'TensorFlow']
    },
    {
      id: 3,
      title: 'Industrial IoT Platform',
      client: 'Manufacturing Corp',
      category: 'completed',
      imageUrl: 'https://via.placeholder.com/800x500?text=IIoT+Platform',
      duration: 'Sep 2022 - Feb 2023',
      description: 'Designed and deployed a custom IIoT platform for real-time equipment monitoring and predictive maintenance.',
      technologies: ['Azure IoT Hub', 'Time Series Insights', 'Power BI', 'React']
    },
    {
      id: 4,
      title: 'Smart City Infrastructure',
      client: 'Metro City Council',
      category: 'ongoing',
      imageUrl: 'https://via.placeholder.com/800x500?text=Smart+City',
      duration: 'Jan 2023 - Dec 2024',
      description: 'Implementing smart city solutions including traffic management, waste management, and public safety systems integration.',
      technologies: ['LoRaWAN', 'Big Data Analytics', 'Cloud Computing', 'Computer Vision']
    },
    {
      id: 5,
      title: 'Renewable Energy Monitoring',
      client: 'EcoPower Inc.',
      category: 'completed',
      imageUrl: 'https://via.placeholder.com/800x500?text=Renewable+Energy',
      duration: 'Jul 2022 - Dec 2022',
      description: 'Developed a monitoring and control system for solar and wind power plants with real-time analytics and reporting.',
      technologies: ['React', 'Python', 'InfluxDB', 'Grafana'],
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
      imageUrl: 'https://via.placeholder.com/800x500?text=Healthcare+Analytics',
      duration: 'May 2023 - Present',
      description: 'Building a secure, HIPAA-compliant data analytics platform for healthcare providers to analyze patient data, treatment outcomes, and operational efficiency.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    }
  ];

  categories: FilterCategory[] = ['all', 'ongoing', 'completed'];
  filteredProjects: Project[] = [];
  selectedCategory: FilterCategory = 'all';

  constructor() {}

  ngOnInit(): void {
    this.filterProjects('all');
  }

  getProjectCount(category: FilterCategory): number {
    if (category === 'all') {
      return this.projects.length;
    }
    return this.projects.filter(project => project.category === category).length;
  }

  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  filterProjects(category: FilterCategory): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }
}
