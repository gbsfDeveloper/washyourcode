"use client";
import { Button, Fab, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useRef, SetStateAction, Dispatch, ChangeEvent, MouseEvent } from "react";
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
  const [existImageLoaded, setExistImageLoaded] = useState<boolean>(false);
  const [actualImage, setImage] = useState<File | null>(null);

  const uploadToServer = async (
    _event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {        
    const body = new FormData();
    if(actualImage){

      body.append("file", actualImage);     
      
      body.append("fileRoute",`subtopic_${ parseInt(id) + 1 }`);   
      const rawResponse = await fetch("/api/upload-image", {
        method: "POST",
        body
      });
      const response = await rawResponse.json();
      console.log(response);
      
      if(!response.error){
        setImage(null);
        setExistImageLoaded(false);
      }
    } 
  };

  const uploadToClient = ( 
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const fileInput = event.target;
      const filesArray = fileInput.files;
      const image = ( filesArray && filesArray[0] ) ? filesArray[0] : null;
      if (image) {
        fileInput.value = "";
        setImage(image);
        setExistImageLoaded(true);
      }
  };

  const onUploadButtonClick = (
    _event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    let imageInput = document.getElementById(`sub_topic_input_${id}`);
    imageInput?.click()
  }

  return (
    <div key={id} id={id} style={{marginTop:'1.5rem', display:'flex',flexDirection:'column',width:'100%', justifyContent:'center',alignItems:'center',}}>
      <Typography sx={{textAlign:'left'}} variant="h6" gutterBottom component="div">
        Subtopic No.{parseInt(id) + 1}
      </Typography>  
      <TextField sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic2" label="SubTitle" variant="filled" />    
      <TextField sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic3" label="Description" variant="filled" />
      
      <input 
        id={`sub_topic_input_${id}`} 
        type="file"
        onChange={ (event)=>{ 
            uploadToClient(event) 
          } 
        } 
        style={{display:'none'}}
      />

      {
        (!existImageLoaded) ?
        <Button sx={{width:'50%'}} color="secondary" variant="contained" onClick={ (event)=>{ onUploadButtonClick(event) } }>Select Image</Button>
        :
        <Button sx={{width:'50%'}} color="success" variant="contained" onClick={ (event)=>{ uploadToServer(event) } }>Upload Image</Button>
      }

    </div>
  )
}

export default function CMS() {
  
  const [subtopics,setSubtopics] = useState<Subtopics[]>([]);
  const [Width,setWidth] = useState(0);
  const [Height,setHeight] = useState(0);

  useEffect(() => {
      useViewport(setWidth,setHeight);
  }, []);

  const createSubtopic = () => {
    const newSubTopic = [
      {
        subtitle:'',
        mainText:'',
        imgRouteList:[]
      },
      ...subtopics
    ]
    setSubtopics(newSubTopic);
  }

  const elements = subtopics.map(function(subtopic, index) {
    return <Subtopic key={`${index}`} id={`${index}`}></Subtopic>
  });
  
  const containerStyles = { 
    m:'0', 
    p:'10rem 0rem',
    backgroundColor:'#0063CC', 
    color:'white', 
    width:`100%`, 
    minHeight:`${Height}px`,
    height:`100%`
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
                <Fab color="primary" aria-label="add" onClick={()=>{createSubtopic()}}>
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
