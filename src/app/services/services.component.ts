import { Component } from '@angular/core';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  ctaText: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: Service[] = [
    {
      id: 1,
      title: 'Engineering Consultancy',
      description: 'Comprehensive engineering solutions tailored to your specific needs. Our expert consultants provide strategic guidance, technical expertise, and innovative approaches to solve complex engineering challenges across various industries.',
      icon: 'bi-gear-wide-connected',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Get Expert Consultation'
    },
    {
      id: 2,
      title: 'Tech Product Development',
      description: 'End-to-end product development services from concept to market. We specialize in creating innovative, scalable, and user-centric technology products that drive business growth and customer satisfaction.',
      icon: 'bi-cpu',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Start Your Project'
    },
    {
      id: 3,
      title: 'Installation & Maintenance',
      description: 'Professional installation and ongoing maintenance services to ensure your systems operate at peak performance. Our certified technicians provide reliable support and preventive maintenance programs.',
      icon: 'bi-tools',
      imageUrl: 'https://images.unsplash.com/photo-1581093057306-e0bde2d768b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Schedule Service'
    },
    {
      id: 4,
      title: 'Software Solutions / Automation',
      description: 'Custom software development and automation services that streamline operations and boost efficiency. We create robust, scalable solutions that integrate seamlessly with your existing infrastructure.',
      icon: 'bi-robot',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Automate Your Business'
    },
    {
      id: 5,
      title: 'Research & Development',
      description: 'Cutting-edge R&D services focused on innovation and technological advancement. We help businesses stay ahead of the curve through continuous research, prototyping, and development of new solutions.',
      icon: 'bi-lightbulb',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Explore Possibilities'
    },
    {
      id: 6,
      title: 'After Sales Support',
      description: 'Comprehensive after-sales support and maintenance services. Our dedicated support team ensures your systems remain operational and up-to-date with the latest features and security patches.',
      icon: 'bi-headset',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800',
      ctaText: 'Get Support'
    }
  ];

  constructor() { }

  scrollToContact(): void {
    // You can implement smooth scrolling to contact form here
    console.log('Scroll to contact form');
  }
}
