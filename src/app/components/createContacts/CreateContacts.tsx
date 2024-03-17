import { ChangeEvent, useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { collection, addDoc } from "firebase/firestore"; 
import { ContactForm } from '@/app/types/contacts';
import { db } from '@/app/config/firebase/config';
import { CirclePlusIcon } from '../icons/CirclePlus';
import { useToast } from '@/components/ui/use-toast';
import { formatPhoneNumberForDisplay, formatPhoneNumberForSaving } from '@/app/helpers/helpers';

interface Props {
  onClose: () => void;
}
export default function CreateContacts({ onClose }: Props) {
  const [contacts, setContacts] = useState([{ name: '', phone: '' }]);
  const [loading, setLoading] = useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const { toast } = useToast();
  const handleAddContact = () => {
    setContacts([...contacts, { name: '', phone: '' }]);
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedValue = name === 'phone' ? formatPhoneNumberForDisplay(value) : value;
    const list: ContactForm[] = [...contacts];
    list[index][name as keyof ContactForm] = formattedValue;
    setContacts(list);
  };

  const handleSaveContacts = async () => {
    try {
      setLoading(true);
      await Promise.all(contacts.map(contact =>{
        if (contact.name === '' || contact.phone === '') {
          toast({
            title: "Erro",
            description: `Os campos 'Nome' e 'Telefone' devem ser preenchidos!`,
            variant: "destructive",
            duration: 3000,
          });
        }else{
          addDoc(collection(db,'contacts'), {phone: formatPhoneNumberForSaving(contact.phone), name: contact.name});
          onClose();
        }
      }
      ));
      setContacts([{ name: '', phone: '' }]);
      setLoading(false);
    } catch (error) {
      console.error('Error saving contacts:', error);
      setLoading(false);
    }
  };

  const handleShowAdditionalInputs = () => {
    setShowAdditionalInputs(true);
    handleAddContact();
  };

  return (
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Add New Contact</h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Fill in the details below to add a new contact.
          </p>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="flex-1"> 
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={`name-${index}`}>
                  Name
                </Label>
                <Input
                  id={`name-${index}`}
                  name="name"
                  placeholder="John Doe"
                  value={contact.name}
                  onChange={event => handleInputChange(index, event)}
                  className="w-full" 
                />
              </div>
            </div>
            <div className="flex-1"> 
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={`phone-${index}`}>
                  Phone
                </Label>
                <Input
                  id={`phone-${index}`}
                  name="phone"
                  placeholder="(55) 12345-6789"
                  maxLength={15}
                  value={contact.phone}
                  onChange={event => handleInputChange(index, event)}
                  className="w-full" 
                />
              </div>
            </div>
            <div className='flex justify-end'> 
              {index === contacts.length - 1 ? (
                <Button onClick={handleShowAdditionalInputs}>
                  <CirclePlusIcon className='h-6 w-6 fill-white'/>
                </Button>
              ) : (
                <div className="w-14" />
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <Button onClick={handleSaveContacts} disabled={loading} size="lg">
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    );
}
