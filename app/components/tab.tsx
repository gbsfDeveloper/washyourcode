import { useState } from "react";
import Image from 'next/image'
type Props = { title:string };


let n;

const imageLoader = ({ src, width, quality } : {src:string,width:string,quality:number}) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export const CreateTab = ({ title }:Props): JSX.Element => {
  const [subtitle, setSubtitle] = useState('Usar nombres de variables que revelen las intenciones');
  const [mainText, setMainText] = useState('Elegir y tomarse el tiempo necesario para darle nombres a las variables a largo plazo ahorrara tiempo de desarrollo y de analisis, la famosa frase cuando desarrolle este codigo dios y yo sabiamos que hacia , ahora solo dios sabe que hace');
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      <button 
        onClick = { ()=>{setIsHidden(!isHidden)} } 
        className="
          w-full
          h-10 
          text-white 
          bg-blue-700 
          hover:bg-blue-800 
          focus:ring-4 
          focus:outline-none 
          focus:ring-blue-300 
          font-medium 
          rounded-lg 
          px-5 
          py-2.5
          dark:bg-blue-600 
          dark:hover:bg-blue-700 
          dark:focus:ring-blue-800
          flex 
          flex-row" 
        type = "button"
      >
        <div className="w-11/12 h-full flex flex-row items-center text-xl">
          <p className="font-bold">
            { title }
          </p>
        </div>
        <div className="w-1/12 h-full flex flex-row justify-end items-center">
          <svg className="w-2.5 h-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </div>
      </button>

      <div className={`z-10 ${ isHidden === true ? 'hidden': ''} w-full flex flex-row justify-center items-center`}>
          <div className={`dark:bg-gray-700 w-[98%] px-10 py-5`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>

                <p className="text-xl font-bold py-1">
                  { subtitle }
                </p>

                <p className="text-lg py-1">
                  { mainText }
                </p>

                {/* SPACER */}
                <div className="py-5"></div>
                
                <div className="w-11/12 h-full flex flex-row items-center">
                  <Image
                    src="/assets/imgs/section_2_img_1.png"
                    width={500}
                    height={500}
                    alt=""
                    className="object-cover h-48 w-96 px-2"
                  />
                  {/* <img className="object-cover h-48 w-96 px-2"></img>
                  <img className="object-cover h-48 w-96 px-2"></img>
                  <img className="object-cover h-48 w-96 px-2"></img> */}
                </div>
              
              </li>
            </ul>
          </div>
      </div>

    </div>
  )
}
