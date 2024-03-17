'use client'
import { Label } from "@radix-ui/react-label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserPlusIcon } from "../icons/UserPlusIcon"
import { GoogleIcon } from "../icons/GoogleIcon"
import { useState } from "react"
import { auth } from "@/app/config/firebase/config"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter()
  const googleAuthProvider = new GoogleAuthProvider();


  const passwordsMatch = password === confirmPassword;

  const handleRegister = async () => {
    if (!passwordsMatch) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      router.push('/pages/login');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      router.push('/pages/login');
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center gap-6 px-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="flex flex-col items-center space-y-2">
            <UserPlusIcon className="h-10 w-10" />
            <div>Cadastre-se</div>
            <div className="text-center">Digite suas informações para se cadastrar</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email2">Email</Label>
              <Input id="email2" placeholder="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password2">Senha</Label>
              <Input id="password2" placeholder="Senha" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password3">Confirme a senha</Label>
              <Input className={passwordsMatch ? '' : 'border-red-500'} id="password3" placeholder="Confirme a senha" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {!passwordsMatch && <p className="text-red-500">As senhas não coincidem</p>}
            </div>
            <Button className="w-full" variant="outline" onClick={handleRegisterWithGoogle}>
              <GoogleIcon className="mr-2 h-4 w-4"/>
              Cadastre-se com Google
            </Button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleRegister}>Cadastre-se</Button>
          </CardFooter>
        </Card>
        <div className="space-y-2">
          <Link className="text-sm underline" href="/pages/login">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  )
}







