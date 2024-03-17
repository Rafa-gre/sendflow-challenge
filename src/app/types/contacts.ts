export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  error?: string;
}