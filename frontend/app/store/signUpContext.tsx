"use client"
import { createContext, useReducer, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpState {
    name: string;
    email: string;
    password: string;
  }
  
  type SignUpAction =
    | { type: "name"; payload: string }
    | { type: "email"; payload: string }
    | { type: "password"; payload: string };
  
  interface SignUpContextType {
    state: SignUpState;
    dispatch: React.Dispatch<SignUpAction>;
    saveTheUser: (e: React.FormEvent) => void;
    signUpError: string | null;
  }
  
  const initialState: SignUpState = {
    name: "",
    email: "",
    password: "",
  };
  
  const SignUpContext = createContext<SignUpContextType>({
    state: initialState,
    dispatch: () => {},
    saveTheUser: () => {},
    signUpError: null,
  });
  
  const reducer = (state: SignUpState, action: SignUpAction): SignUpState => {
    switch (action.type) {
      case "name":
        return {
          ...state,
          name: action.payload,
        };
      case "email":
        return {
          ...state,
          email: action.payload,
        };
      case "password":
        return {
          ...state,
          password: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const useSignUpContext = (): SignUpContextType => {
    return useContext(SignUpContext);
  };
  
  
  export default function SignUpContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [signUpError, setSignUpError] = useState<string | null>('');
    
    const router = useRouter();

    const saveTheUser = async (e: React.FormEvent) => {
      
      e.preventDefault();

      console.log('saving user', state) 
      try {
        const res = await fetch('http://uicolorserver.unurluworks.com/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: state.name,
            email: state.email,
            password: state.password
          })
        })
        console.log(res)
  
        if (res.ok) {
          
           const data = await res.json();

           console.log(data);

           localStorage.setItem('token', JSON.stringify(data.token));

           console.log('User logged in'); 

           router.push('/pages/home');

        } else {
            
          const errorMessage = await res.json();
          setSignUpError(errorMessage.error);

        }
  
      } catch (error) {
        console.log(error)
      }
  
      }
  
    return (
      <SignUpContext.Provider value={{ state, dispatch, saveTheUser, signUpError }}>
        {children}
      </SignUpContext.Provider>
    );
  }
  