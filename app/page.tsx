"use client";
// import {CreateTab} from "./components/tab";
import Header from "./components/head";
import Accordion from "./components/accordion";
import { useState, useEffect  } from "react";
import { Divider } from "@mui/material";

export default function Home() {
  const defaultTopic = [
    {
      title: '2.1 Nombres con sentido',
      subTopics:[{
        subtitle:'Usar nombres de variables que revelen las intenciones',
        mainText:'Elegir y tomarse el tiempo necesario para darle nombres a las variables a largo plazo ahorrara tiempo de desarrollo y de analisis, la famosa frase cuando desarrolle este codigo dios y yo sabiamos que hacia , ahora solo dios sabe que hace',
        imgRouteList:[{
          imgRoute:'/assets/imgs/section_2_img_1.png',
          language:'Javascrip (JS)'
        }]
      }]
    }
  ] as Topic[];
  const [isLoading, setLoading] = useState(true)
  const [topics, setTopics] = useState(defaultTopic);
  // const rootUrl = process.env.PROJECT_ROOT_URL;
  useEffect(() => {
    fetch('/api/lessons')
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topicsData);
        setLoading(false);
      })
  }, [])
  
  if (isLoading) return <p>Loading...</p>;
  if (!topics) return <p>No topics data</p>;

  return (
    <main>
      <div>
      
        <Header></Header>
        
        {
          topics.map((topic) => (
            <> 
              <Accordion key={topic.title} title={topic.title} subTopics= {topic.subTopics} ></Accordion>
              <Divider /> 
            </> 
          ))
        }
        
      </div>
    </main>
  )
}
