import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useDropzone} from 'react-dropzone';
import { useContext} from 'react';
import { HomeContext } from '../context/HomeContext';
import { Icon } from '@material-ui/core';

export default function Home() {
  const {
    canvasRef,
    upperText,
    lowerText,
    setUpperText,
    setLowerText,
    onDrop,
    images
  } = useContext(HomeContext);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: ["image/*"]});

  return (
    <div className={styles.container}>
      <Head>
        <title>Fábrica de Memes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.title}>
        <h1>Crie memes rápido e de forma fácil</h1>
      </div>
      <main className={styles.content}>
        <div {...getRootProps()} className={styles.canvas}>
          {
            isDragActive ? 
              (
                <div className={styles.drag}>
                    <Icon className={styles.uploadicon}>file_upload</Icon>
                    <h1>Solve para carregar a imagem</h1>
                </div>
              )
            :
            (
                <canvas className={styles.painel} ref={canvasRef}>

                </canvas>
            )
          }
          
            <input {...getInputProps()} />
        </div>
        <form className={styles.form}>
          <div>
            <label htmlFor="upperText">Texto superior</label>
            <textarea 
              id="upperText"
              name="upperText"
              value={upperText}
              onChange={(e) => setUpperText(e.target.value)}
            />
          </div>
          <div>
          <label htmlFor="lowerText">Texto inferior</label>
            <textarea 
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
