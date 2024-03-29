"use client"
import { createContext, useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"

const StoreContext = createContext<ContextApi>({
    onFavPage: false,
    setOnFavPage: () => {},
    addToFavs: () => {},
    getAllTheColors: () => {},
    getData: () => {},
    colors: [],
    setColors: () => {},
    deleteColorByHex: () => {},
    handleDelete: () => {},
    signOut: () => {},
    toggleInputType: () => {},
    inputType: "password",
    setInputType: () => {}
    
  });

export function useContextApi(){
    return useContext(StoreContext)  
}


interface ContextApi {
    onFavPage: boolean;
    setOnFavPage: React.Dispatch<React.SetStateAction<boolean>>;
    addToFavs: (color: string) => void; 
    getAllTheColors: (url: string) => void;
    getData: () => void;
    colors: string[];
    setColors: React.Dispatch<React.SetStateAction<string[]>>;
    deleteColorByHex: (hex: string) => void;
    handleDelete: (colorId: any) => void;
    signOut: () => void;
    toggleInputType: () => void;
    inputType: string;
    setInputType: React.Dispatch<React.SetStateAction<string>>;
}

interface ContextApiProviderProps {
    children: React.ReactNode;
}

export default function ContextApiProvider({ children }: ContextApiProviderProps) {

    const [onFavPage, setOnFavPage] = useState(false);
    const [colors, setColors] = useState<any>([]);
    const [inputType, setInputType] = useState<string>("password");
    

    const router = useRouter();
   
    const urlPost = 'http://uicolorserver.unurluworks.com/api/postColors';  
    async function postData(urlPost: string, postData: { colors: string }) {

        const token = localStorage.getItem('token');
        const parsedToken = token ? JSON.parse(token) : null;
    
        if (!parsedToken) {
            // Handle the case where there is no valid token (optional)
            console.warn('No valid token found.');
            return;
        }

        try {
            console.log(postData);
            const response = await fetch(urlPost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}`,
                },
                body: JSON.stringify(postData),
            });
    
            if(response.ok) {
                console.log('Data sent successfully');
                const data = await response.json();  
                console.log("data", data);       
                return data;
            }
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
 

    const addToFavs = async(color: string) => {
        const dataToSend = { colors: color };
            console.log("dataToSend", dataToSend)
            setColors([...colors, color]);
            await postData(urlPost, dataToSend);
            console.log("colors", colors) 
    };

  

    const getAllTheColors = async ( urlGet: string ) => {

        const token = localStorage.getItem('token');
        const parsedToken = token ? JSON.parse(token) : null;
    
        if (!parsedToken) {
            // Handle the case where there is no valid token (optional)
            console.warn('No valid token found.');
            return;
        }

        console.log("parsedToken", parsedToken)

        try {
            const response = await fetch(urlGet, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("data", data)          
           
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const getData = async () => {

        const data = await getAllTheColors('http://uicolorserver.unurluworks.com/api/getColors');
       
        setColors(data);  

        
    }

 

    async function handleDelete(colorId: any) {

        const token = localStorage.getItem('token');
        const parsedToken = token ? JSON.parse(token) : null;
    
        if (!parsedToken) {
            // Handle the case where there is no valid token (optional)
            console.warn('No valid token found.');
            return;
        }

        console.log("parsedToken", parsedToken)

        console.log("colorId", colorId)

        setColors(colors.filter((color : any) => color._id !== colorId));
        
        try {
            const response = await fetch(`http://uicolorserver.unurluworks.com/api/deleteColor/${colorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data", data)
            
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }

    }

    const deleteColorByHex = async (hex: string) => {
        
        const token = localStorage.getItem('token');
        const parsedToken = token ? JSON.parse(token) : null;
    
        if (!parsedToken) {
            // Handle the case where there is no valid token (optional)
            console.warn('No valid token found.');
            return;
        }

        const url = `http://uicolorserver.unurluworks.com/api/viahex/${encodeURIComponent(hex)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedToken}`,
                }
            });
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            setColors(colors.filter((color : any) => color !== hex));
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    
    }

    async function signOut() {
        
        localStorage.removeItem('token');

        setColors([]);

        setOnFavPage(false);

        router.push('/');

    }

    
    const toggleInputType = () => {
        setInputType("text");
        setTimeout(() => {
            setInputType("password");
        }, 800);
    };


 
    return (
        <StoreContext.Provider value={{ colors, addToFavs, deleteColorByHex, getData,
          onFavPage, setOnFavPage, getAllTheColors, setColors, handleDelete, signOut,
          inputType, setInputType, toggleInputType }} >
            {children}
        </StoreContext.Provider>

    )

}