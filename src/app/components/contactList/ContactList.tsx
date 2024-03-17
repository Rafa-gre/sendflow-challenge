import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { Contact } from '@/app/types/contacts';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/app/config/firebase/config';
import CreateContacts from '../createContacts/CreateContacts';
import { useToast } from '@/components/ui/use-toast';
import SendMessageForm from '../sendMessageForm/SendMessageForm';
import { formatPhoneNumberForDisplay } from '../../helpers/helpers';
import { getAuth, signOut } from 'firebase/auth';


export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const { toast } = useToast();
  const auth = getAuth();

  const fetchContacts = useCallback(async () => {
    try {
      const contactsCollection = await getDocs(collection(db, 'contacts'));
      const contactsData = contactsCollection.docs.map((doc: { id: any; data: () => any; }) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: `Erro ao carregar os contatos : ${error}`,
        variant: "destructive",
        duration: 3000,
      });
      setLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    fetchContacts();
  };

  const openMessageModal = () => {
    setMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      // Faça a lógica para excluir o contato com o ID fornecido
      // Por exemplo:
      await deleteDoc(doc(db, 'contacts', contactId));
      toast({
        title: "Sucesso",
        description: `Contato excluído com sucesso`,
        variant: "default",
        duration: 3000,
      });
      // Atualize a lista de contatos removendo o contato excluído
      setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
      toast({
        title: "Erro",
        description: `Erro ao excluir o contato: ${error}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast({
          title: "Sucesso",
          description: `Logout efetuado com sucesso`,
          variant: "default",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error('Erro ao realizar o logout:', error);
        toast({
          title: "Erro",
          description: `Erro ao realizar o logout: ${error}`,
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white shd sm:rounded-lg">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-lg font-bold leading-none">Contatos</h1>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={openCreateModal}>Adicionar</Button>
              {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                  <div className="bg-white p-4 rounded-lg relative gap-4">
                    <button onClick={closeCreateModal} className="absolute top-0 right-0 mr-2 h-4 w-4 text-2xl">&times;</button>
                    <CreateContacts onClose={closeCreateModal} />
                  </div>
                </div>
              )}
              <Button size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200" />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="divide-y divide-gray-200 max-h-[calc(100vh - 300px)] overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Não há contatos salvos no momento.</div>
            ) : (
              contacts.map(contact => (
                <div key={contact.id} className="p-6 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500">{formatPhoneNumberForDisplay(contact.phone)}</div>
                  </div>
                  <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={()=>handleDeleteContact(contact.id)}>
                      Remover
                    </Button>
                    <Button size="sm" variant="outline" onClick={openMessageModal}>
                      Enviar Mensagem
                    </Button>
                    {isMessageModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white p-4 rounded-lg relative gap-4">
                          <button onClick={closeMessageModal} className="absolute top-0 right-0 mr-2 h-4 w-4 text-2xl">&times;</button>
                          <SendMessageForm contact={contact}/>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
