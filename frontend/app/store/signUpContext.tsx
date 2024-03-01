"use client"
import { createContext, useReducer, useContext } from "react";
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
    saveTheUser: () => void;
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
    
    const router = useRouter();

    const saveTheUser = async () => {
      console.log('saving user', state) 
      try {
        const res = await fetch('http://localhost:7000/user/register', {
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
          console.log('user saved')
          console.log("ready to go home")
          router.push('/pages/home')
        } else {
          console.log('user not saved')
        }
  
      } catch (error) {
        console.log(error)
      }
  
      }
  
    return (
      <SignUpContext.Provider value={{ state, dispatch, saveTheUser }}>
        {children}
      </SignUpContext.Provider>
    );
  }
  