import { createContext, MutableRefObject, ReactNode, useRef, useState } from "react";

interface HomeContextData {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    upperText: string;
    lowerText: string;
    setUpperText: (value:string) => void;
    setLowerText: (value:string) => void;
}

export const HomeContext = createContext({} as HomeContextData);

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [upperText, setUpperText] = useState("");
    const [lowerText, setLowerText] = useState("");

    return (
        <HomeContext.Provider value={{
            canvasRef,
            upperText,
            lowerText,
            setUpperText,
            setLowerText
        }}>
        {
            children
        }
        </HomeContext.Provider>
    )
}