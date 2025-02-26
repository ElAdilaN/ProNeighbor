import { Component } from '@angular/core';

@Component({
  selector: 'app-saq',
  standalone: true,
  imports: [],
  templateUrl: './saq.component.html',
  styleUrl: './saq.component.css',
})
export class SaqComponent {
  faqs = [
    {
      question: 'What is this platform about?',
      answer:
        'This platform connects users with service providers such as teachers, painters, and other professionals.',
      open: false,
    },
    {
      question: 'Who can use this platform?',
      answer:
        'Users looking for services and service providers offering services.',
      open: false,
    },
    {
      question: 'How do I update my profile?',
      answer:
        'Go to the "Profile" section in the dashboard to modify your information.',
      open: false,
    },
    {
      question: 'How do I start a chat with a provider?',
      answer:
        'Go to "All Services", find a service, click "Chat Now", enter a chat name, and start chatting.',
      open: false,
    },
    {
      question: 'How do I add a new service?',
      answer:
        'Click "Add Service" in the dashboard, fill out the form, and submit your service details.',
      open: false,
    },
    {
      question: 'How do I log out?',
      answer:
        'Click the "Logout" button in the dashboard to securely sign out.',
      open: false,
    },
  ];

  toggleFAQ(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
