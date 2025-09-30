import React from 'react'
import { useState, createContext } from 'react'

interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: React.ReactNode
}

function Authprovider({ children }: Props) {
  const [auth, setAuth] = useState({
    name:'',
    email: '',
    role: '',
    token: ''
  });



  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext };
export default Authprovider;