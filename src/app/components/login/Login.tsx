import { useState } from 'react';
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockIcon } from "../icons/LockIcon"
import { GoogleIcon } from "../icons/GoogleIcon"
import { auth } from "@/app/config/firebase/config"
import { useRouter } from "next/navigation"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const googleAuthProvider = new GoogleAuthProvider();
  const router = useRouter();
  const {toast} = useToast()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/pages/contacts');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      router.push('/pages/contacts');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = () => {

    if (!email) {
      toast({
        title: `Erro`,
        description: `Por favor, insira seu email`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => { toast({
        title: "Sucesso",
        description: `Email de redefinição de senha enviado para ${email}`,
        variant: "default",
        duration: 3000,
      }); })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast({
      title: `Erro: ${errorCode}`,
      description: `Erro ao enviar email de redefinição de senha: ${errorMessage}`,
      variant: "destructive",
      duration: 3000,
    });
  });
  };

  return (
    <div className="grid min-h-screen place-items-center gap-6 px-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="flex flex-col items-center space-y-2">
            <LockIcon className="h-10 w-10" />
            <div>Login</div>
            <div className="text-center">Digite seu email e senha para acessar</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button className="ml-auto text-sm underline" onClick={handleForgotPassword}>
                  Esqueceu sua senha?
                </button>
              </div>
              <Input id="password" placeholder="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <Button className="w-full" variant="outline" onClick={handleLoginWithGoogle}>
              <GoogleIcon className="mr-2 h-4 w-4"/>
              Login com Google
            </Button>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
        <div className="space-y-2">
          <Link className="text-sm underline" href="/pages/register">
            Não é cadastrado? Crie uma conta
          </Link>
        </div>
      </div>
    </div>
  )
}
