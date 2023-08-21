"use client";
// import {CreateTab} from "./components/tab";
import Header from "./components/head";
import Accordion from "./components/accordion";
import { useState } from "react";

type Topic = {
  subtitle:string,
  mainText:string,
}

export default function Home() {
  const [ titleTest,setTitleTest ] = useState("2.1 Nombres con sentido");
  
  const [subtitle, setSubtitle] = useState('Usar nombres de variables que revelen las intenciones');
  const [mainText, setMainText] = useState('Elegir y tomarse el tiempo necesario para darle nombres a las variables a largo plazo ahorrara tiempo de desarrollo y de analisis, la famosa frase cuando desarrolle este codigo dios y yo sabiamos que hacia , ahora solo dios sabe que hace');

  const [topics, setTopics] = useState([
    {
      subtitle,
      mainText
    }
  ] as Topic[]);
  return (
    <main>
      <div>
      
        <Header></Header>

        <Accordion title = {titleTest} topics = {topics} ></Accordion>
        
        {/* <CreateTab title = {titleTest}></CreateTab> */}
      </div>
    </main>
  )
}
