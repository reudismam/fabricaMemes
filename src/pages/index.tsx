import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useDropzone} from 'react-dropzone';
import { useContext, useRef } from 'react';
import { HomeContext } from '../context/HomeContext';

export default function Home() {
  const {
    canvasRef,
    upperText,
    lowerText,
    setUpperText,
    setLowerText
  } = useContext(HomeContext);

  const {getRootProps, getInputProps} = useDropzone({});

  return (
    <div className={styles.container}>
      <Head>
        <title>Fábrica de Memes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.title}>
        <h1>Crie o memes rápido e de forma fácil</h1>
      </div>
      <main className={styles.content}>
        <canvas {...getRootProps} className={styles.canvas} ref={canvasRef} onClick={() => {
          alert(canvasRef.current);
          
        }}>
            <input {...getInputProps} />
        </canvas>
        <form>
          <div>
            <label htmlFor="upperText">Texto superior</label>
            <input 
              id="upperText"
              name="upperText"
              value={upperText}
              onChange={(e) => setUpperText(e.target.value)}
            />
          </div>
          <div>
          <label htmlFor="lowerText">Texto superior</label>
            <input 
              id="lowerText"
              name="lowerText"
              value={lowerText}
              onChange={(e) => setLowerText(e.target.value)}
            />
          </div>
        </form>
      </main>
    </div>
  )
}
