"use client";
import { Button, Fab, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useRef, SetStateAction, Dispatch, ChangeEvent } from "react";
// import useViewport from '../lib/hooks/useViewport';

const theme = createTheme({
  palette: {
    background: {
      main: '#0063CC',
    },
    text: {
      primary: 'white',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

type TUseViewportSetState = Dispatch<SetStateAction<number>>;

const useViewport = (
  setWidth:TUseViewportSetState,
  setHeight:TUseViewportSetState
) => {
  const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  };
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);
  return () => window.removeEventListener("resize", handleWindowResize);
}

const Subtopic = ({id}:{id: string}) => {
  const [existImageUploaded, setExistImageUploaded] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  
  const uploadToServer = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {        
    const body = new FormData();
    if(image){
      body.append("file", image);    
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body
      });
    }
  };

  // const uploadToClient = (
  //     event: ChangeEvent<HTMLInputElement>,
  //     // setImage:Dispatch<SetStateAction<string | null>>,
  //     // setCreateObjectURL:Dispatch<SetStateAction<string | null>>
  //   ) => {
  //     if (event.target.files && event.target.files[0]) {
  //       const i = event.target.files[0];
  //       console.log("IMAGE files");
  //       console.log(i);
        
  //       setImage(i);
  //       setCreateObjectURL(URL.createObjectURL(i));
  //     }
  // };

  return (
    <div key={id} id={id} style={{display:'flex',flexDirection:'column',width:'100%', justifyContent:'center',alignItems:'center',}}>
      <Typography sx={{textAlign:'left'}} variant="h6" gutterBottom component="div">
        Subtopic No.{parseInt(id) + 1}
      </Typography>  
      <TextField sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic2" label="SubTitle" variant="filled" />    
      <TextField sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic3" label="Description" variant="filled" />
      
      <input 
        id="imageInput" 
        type="file" 
        name="myImage" 
        onChange={ (event)=>{ 
            // uploadToClient(event, setImage, setCreateObjectURL) 
          } 
        } 
        style={{display:'none'}}
      />

      {
        (!existImageUploaded) ?
        <Button sx={{width:'50%'}} color="secondary" variant="contained" onClick={()=>{let imageInput = document.getElementById("imageInput");imageInput?.click()}}>Select Image</Button>
        :
        <Button sx={{width:'50%'}} color="success" variant="contained" onClick={()=>{let imageInput = document.getElementById("imageInput");imageInput?.click()}}>Upload Image</Button>

      }

    </div>
  )
}

function createSubtopic(
    subtopics:Subtopics[],
    setSubtopics:Dispatch<SetStateAction<Subtopics[]>>
  ){

  const newSubTopic = [
    {
      subtitle:'',
      mainText:'',
      imgRouteList:[]
    },
    ...subtopics
  ]
  // console.log(newSubTopic);
  setSubtopics(newSubTopic);
}

export default function CMS() {
  
  const [subtopics,setSubtopics] = useState<Subtopics[]>([]);
  const [Width,setWidth] = useState(0);
  const [Height,setHeight] = useState(0);

  useEffect(() => {
      useViewport(setWidth,setHeight);
  }, []);


  const elements = subtopics.map(function(subtopic, index) {
    return <Subtopic key={`${index}`} id={`${index}`}></Subtopic>
  });
  
  const containerStyles = { 
    m:'0', 
    p:'10rem 0rem',
    backgroundColor:'#0063CC', 
    color:'white', 
    width:`100%`, 
    height:`${Height}px`
  };

  return (
    <main>
      <div>
        {/* <ThemeProvider theme={theme}> */}
          <Grid container spacing={2} sx={containerStyles}>
            
            <Grid item xs={12} sx={{ display: 'flex', flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
              <Typography sx={{textAlign:'center'}} variant="h6" gutterBottom component="div">
                Create a new topic
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
      
              <TextField sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic1" label="Title" variant="filled" />
              
              <Grid item xs={12} sx={{ p: '1rem 0rem', display: 'flex', flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
                <Fab color="primary" aria-label="add" onClick={()=>{createSubtopic(subtopics,setSubtopics)}}>
                  <AddIcon />
                </Fab>
                <Typography sx={{ textAlign:'center' }} gutterBottom variant="subtitle1" component="div">
                  Add new subtopic
                </Typography>
              </Grid>

              {elements}

            </Grid>
            
          </Grid>
        {/* </ThemeProvider> */}
      </div>
    </main>
  )
}
