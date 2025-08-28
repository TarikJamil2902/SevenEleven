import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafePipe } from '../shared/pipes/safe.pipe';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [SafePipe]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;

  // Contact Information
  contactInfo = {
    address: '123 Business Street, Dhaka 1212, Bangladesh',
    phone: '+880 1234 567890',
    email: 'info@seveneleven.com',
    workingHours: [
      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    socialMedia: [
      { name: 'Facebook', icon: 'bi-facebook', url: '#' },
      { name: 'Twitter', icon: 'bi-twitter', url: '#' },
      { name: 'LinkedIn', icon: 'bi-linkedin', url: '#' },
      { name: 'Instagram', icon: 'bi-instagram', url: '#' }
    ]
  };

  // Google Maps Embed URL (replace with your actual location)
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7938478881434!2d90.40663731543193!3d23.79086839364297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c36498f90fe23!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd';

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+\-\s()]*$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    
    // Here you would typically call your contact service
    console.log('Form submitted', this.contactForm.value);
    
    // Simulate API call
    setTimeout(() => {
      // Reset form
      this.submitted = false;
      this.contactForm.reset();
      this.loading = false;
      
      // Show success message (you can implement this with a toast or alert)
      alert('Thank you for your message. We will get back to you soon!');
    }, 1500);
  }
}
