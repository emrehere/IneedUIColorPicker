"use client"
import { createContext, useState, useContext, useEffect } from "react"

const StoreContext = createContext<ContextApi>({
    onFavPage: false,
    setOnFavPage: () => {},
    addAndRemoveToFavs: () => {},
    getAllTheColors: () => {},
    getData: () => {},
    colors: [],
    setColors: () => {},
    deleteColorByHex: () => {},
    handleDelete: (id: string) => {}
  });

export function useContextApi(){
    return useContext(StoreContext)  
}

interface ContextApi {
    onFavPage: boolean;
    setOnFavPage: React.Dispatch<React.SetStateAction<boolean>>;
    addAndRemoveToFavs: (color: string) => void; 
    getAllTheColors: (url: string) => void;
    getData: () => void;
    colors: string[];
    setColors: React.Dispatch<React.SetStateAction<string[]>>;
    deleteColorByHex: (hex: string) => void;
    handleDelete: (id: string) => void;


}

interface ContextApiProviderProps {
    children: React.ReactNode;
}

export default function ContextApiProvider({ children }: ContextApiProviderProps) {

    const [onFavPage, setOnFavPage] = useState(false);
    const [colors, setColors] = useState<string[]>([]);
   
    const url = 'http://localhost:7000/api';  
    async function postData(url: string, postData: { colors: string }) {
        try {
            console.log(postData);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
    
            console.log("Response:", response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
         
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
 

    const addAndRemoveToFavs = async(color: string) => {
        const dataToSend = { colors: color };
           
            setColors([...colors, color]);
            await postData(url, dataToSend);
      
    };


    const getAllTheColors = async ( url: string ) => {
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
          
           
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const getData = async () => {

        const data = await getAllTheColors('http://localhost:7000/api');
       
        setColors(data);  
    }

    async function handleDelete(id: string) {
     

        setColors(colors.filter((color) => color._id !== id))
        
        try {
            const response = await fetch(`http://localhost:7000/api/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }

    }

    const deleteColorByHex = async (hex: string) => {
        console.log("frontend", hex)
        console.log(typeof hex)
        const url = `http://localhost:7000/api/viahex/${encodeURIComponent(hex)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    
    }
 
    return (
        <StoreContext.Provider value={{ colors, addAndRemoveToFavs, deleteColorByHex, getData,
         handleDelete, onFavPage, setOnFavPage, getAllTheColors, setColors }} >
            {children}
        </StoreContext.Provider>

    )

}