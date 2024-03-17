'use client'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import ContactList from "@/app/components/contactList/ContactList";

export default function ContactsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const auth = getAuth(); 

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); 
      } else {
        router.push('/pages/login'); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  return isAuthenticated ? <ContactList /> : null;
}
