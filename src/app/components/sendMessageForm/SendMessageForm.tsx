import { SetStateAction, useState } from 'react';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Contact } from '@/app/types/contacts';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  contact: Contact;
}

export default function SendMessageForm({ contact }: Props) {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleMessageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    try {
      if (message === '') {
        toast({
          title: "Erro",
          description: `Não é possível enviar uma mensagem vazia`,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        // Aqui você enviaria a mensagem para a rota da API
        console.log(`Enviando a mensagem ${message} para ${contact.name} no número ${contact.phone}`);
        toast({
          title: "Mensagem Enviada",
          description: `Enviando a mensagem ${message} para ${contact.name} no número ${contact.phone}`,
          variant: "default",
          duration: 5000,
        });

        // Após enviar a mensagem com sucesso, você pode limpar o estado
        setMessage('');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro",
        description: `Erro ao enviar a mensagem: ${error}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <div className='text-lg font-bold'>Mensagem para: {contact.name}</div>
      <div className="py-6">
        <div className="space-y-4">
          <Label className="font-medium" htmlFor="message">
            Mensagem
          </Label>
          <Textarea
            id="message"
            placeholder="Sua mensagem..."
            value={message}
            onChange={handleMessageChange}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 py-4">
        <Button onClick={handleSend}>Enviar</Button>
      </div>
    </div>
  );
}
