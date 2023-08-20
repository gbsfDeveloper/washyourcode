"use client";
import {CreateTab} from "./components/tab";
import { useState } from "react";

export default function Home() {
  const [ titleTest,setTitleTest ] = useState("2.1 Nombres con sentido");
  return (
    <main>
      <div>
        {/* <CreateTab title = {titleTest}></CreateTab> */}
      </div>
    </main>
  )
}
