export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  outcome: string;
  location: string;
  year: string;
  details: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tags: string[];
  copy: string;
  details: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  location: string;
  brief: string;
  timestamp: string;
  status: 'Received' | 'Reviewing' | 'Scheduled';
}
