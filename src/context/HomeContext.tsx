import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeContextData {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    upperText: string;
    lowerText: string;
    images: string[];
    setUpperText: (value:string) => void;
    setLowerText: (value:string) => void;
    onDrop: (filesSelected) => void;
}

export const HomeContext = createContext({} as HomeContextData);

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [upperText, setUpperText] = useState("");
    const [lowerText, setLowerText] = useState("");
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (images && images.length > 0) {
            const imagesrc = images[0];
            
            const image = new Image();
            image.onload = () => {
                const canvas = canvasRef.current;
                canvas.width = 500;
                canvas.height = 500;
                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, 500, 500);

                context.font = "30pt Impact";
                context.fillStyle = "white";
                context.lineWidth = 4;
                context.strokeText(upperText, 50, 60);

                context.fillText(upperText, 50, 60);
                
            }
            image.src = imagesrc;
        }
    }, [images, upperText, lowerText])

    const onDrop = (filesSelected: any[]) => {
       if (filesSelected) {
         filesSelected.map((file)=> {
            const reader = new FileReader();

            reader.onload = (e) => {
                const upatedImages = [String(e.target.result), ...images];
                setImages(upatedImages);
            };

            reader.readAsDataURL(file);
            return file;
         });
       }
    }

    return (
        <HomeContext.Provider value={{
            canvasRef,
            upperText,
            lowerText,
            images,
            setUpperText,
            setLowerText,
            onDrop
        }}>
        {
            children
        }
        </HomeContext.Provider>
    )
}