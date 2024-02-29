"use client";
import { useContext, createContext, useReducer, useState } from "react";

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
}

const initialState: SignInState = {
    email: "",
    password: "",

};

const SignInContext = createContext<SignInContextType>({
    state: initialState,
    dispatch: () => {},
    loginUser: () => {},
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

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("hadi basla")
        console.log('login user', state)
        
        try {
            const res = await fetch('http://localhost:7000/user/login', {
               
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
            } else {
                console.log('User not logged in. Status:', res.status);
                const errorData = await res.json(); // If the server returns error details in the response body
                console.log('Error Details:', errorData);
            }
        } catch (error) {
            console.log('Error during login:', error);
        }
    };


    return (
        <SignInContext.Provider value={{ state, dispatch, loginUser }}>
            {children}
        </SignInContext.Provider>
    );
}