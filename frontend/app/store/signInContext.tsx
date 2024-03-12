"use client";
import { useContext, createContext, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

interface SignInState {
    email: string;
    password: string;
}



type SignInAction =
    | { type: "email"; payload: string }
    | { type: "password"; payload: string }

    

interface SignInContextType {
    state: SignInState;
    dispatch: React.Dispatch<SignInAction>;
    loginUser: (e: React.FormEvent) => void;
    signInError: string | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState: SignInState = {
    email: "",
    password: "",

};

const SignInContext = createContext<SignInContextType>({
    state: initialState,
    dispatch: () => {},
    loginUser: () => {},
    signInError: null,
    loading: false,
    setLoading: () => {},
});

const reducer = (state: SignInState, action: SignInAction): SignInState => {
    switch (action.type) {
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

export const useSignInContext = (): SignInContextType => {
    return useContext(SignInContext);
};


export default function SignInContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [userData, setUserData] = useState({});
    const [signInError, setSignInError] = useState<string | null>('');
    const [loading , setLoading] = useState<boolean>(false);

    const router = useRouter();

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("hadi basla")
        console.log('login user', state)
        setLoading(true)
        
        try {
            const res = await fetch('http://uicolorserver.unurluworks.com/user/login', {
               
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',             
                },
                body: JSON.stringify({
                    email: state.email,
                    password: state.password,
                }),
            });
    
            if (res.ok) {
                const data = await res.json();
                console.log("coming data",data);
                
                setUserData(data);

                console.log('User data:', data);
    
                // Store the token securely in localStorage
                localStorage.setItem('token', JSON.stringify(data.token));

                console.log('User logged in');   
                 
                router.push('/pages/home');
            } else {
                console.log('User not logged in. Status:', res.status);
                const errorData = await res.json(); // If the server returns error details in the response body
                setSignInError(errorData.error);
            
            }
        } catch (error) {
            console.log('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SignInContext.Provider value={{ state, dispatch, loginUser, signInError, loading, setLoading }}>
            {children}
        </SignInContext.Provider>
    );
}