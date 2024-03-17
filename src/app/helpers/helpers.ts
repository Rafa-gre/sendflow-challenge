export function formatPhoneNumberForDisplay(phoneNumber: string) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phoneNumber;
}

export function formatPhoneNumberForSaving(phoneNumber:string) {
  // Remove todos os caracteres não numéricos
  return ('' + phoneNumber).replace(/\D/g, '');
}