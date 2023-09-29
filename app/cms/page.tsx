"use client";
import { Alert, Button, Fab, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useRef, SetStateAction, Dispatch, ChangeEvent, MouseEvent, FormEvent } from "react";
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

const Subtopic = ({ id, subtopicData, subtopics,setSubtopics }:{ id: string, subtopicData:TSubtopicFiles , subtopics: TSubtopicFiles[], setSubtopics: Dispatch<SetStateAction<TSubtopicFiles[]>> }) => {
  const [existImageLoaded, setExistImageLoaded] = useState<boolean>(false);
  const [actualImage, setImage] = useState<File | null>(null);
  const [saveTopicButtonEnabled, setSaveTopicButtonEnabled] = useState<boolean>(false);
  const [subtitle, setSubtitle] = useState<string>(subtopicData.subtitle);
  const [description, setDescription] = useState<string>(subtopicData.mainText);
  const subtopicNumber = parseInt(id) + 1;

  useEffect(() => {
    onSaveSubtopic();
  }, [actualImage,subtitle,description]);

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

  const onSubmitTopic = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(actualImage){
      formData.append("file", actualImage);
    }
    console.log(Array.from(formData.values()));
  }

  const onSaveSubtopic = () => {
   
    const idNumber = parseInt(id);
    subtopics[idNumber] = {
      subtitle: subtitle,
      mainText: description,
      imgs: (actualImage) ? [actualImage] : []
    }
    setSubtopics([...subtopics]);
  }

  return (
    <div key={id} id={id} style={{marginTop:'1.5rem', display:'flex',flexDirection:'column',width:'100%', justifyContent:'center',alignItems:'center',}}>
      <Typography sx={{textAlign:'left'}} variant="h6" gutterBottom component="div">
        Subtopic No.{subtopicNumber}
      </Typography> 
      {/* <form onSubmit={onSubmitTopic}> */}
        <TextField value={subtitle} onChange={(e)=>{ setSubtitle(e.target.value); }} sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic2" label="SubTitle" variant="filled" />    
        <TextField value={description} onChange={(e)=>{ setDescription(e.target.value); }} sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic3" label="Description" variant="filled" />  
        {
          (!existImageLoaded) ?
          <Button sx={{width:'50%'}} color="secondary" variant="contained" onClick={ (event)=>{ onUploadButtonClick(event) } }>Select Image</Button>
          :
          // <Button sx={{width:'50%'}} color="success" variant="contained" onClick={ (event)=>{ uploadToServer() } }>Upload Image</Button>
          <Alert sx={{width:'30%'}} severity="success"> 
            {actualImage?.name} - Image Ready to upload  
            <Button sx={{width:'100%'}} color="secondary" variant="contained" onClick={ (event)=>{ onUploadButtonClick(event) } }>Change Image</Button>
          </Alert>
            
        }

        {/* <Button type='submit' disabled={ saveTopicButtonEnabled ? true : false} sx={{width:'50%'}} color="success" variant="contained" >Save Topic</Button> */}
      {/* </form>  */}
      
      <input 
        id={`sub_topic_input_${id}`} 
        type="file"
        onChange={ (event)=>{ 
            uploadToClient(event);
          } 
        } 
        style={{display:'none'}}
      />

    </div>
  )
}

export default function CMS() {
  
  const [subtopics,setSubtopics] = useState<TSubtopicFiles[]>([]);
  const [Width,setWidth] = useState(0);
  const [Height,setHeight] = useState(0);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
      useViewport(setWidth,setHeight);
  }, []);

  const createSubtopic = () => {
    const newSubTopic = [
      ...subtopics,
      {
        subtitle:'',
        mainText:'',
        imgs:[]
      },
    ]
    setSubtopics(newSubTopic);
  }

  const uploadSubtopics = async () => {
    
    if(subtopics.length <= 0){ 
      return console.log("El Array esta vacio");
    }

    const body = new FormData();
    body.append("title", title);
    const subtopicsEntries = subtopics.entries();
    for ( const [key, subtopic] of Array.from(subtopicsEntries) ) {
      body.append(`subtitle_${key}`, subtopic.subtitle);
      body.append(`mainText_${key}`, subtopic.mainText);
      const imageFile = subtopic.imgs[0];
      if(imageFile){
        body.append(`file_${key}`, imageFile);
      }
    }
    body.append(`subtopicsLenght`, `${subtopics.length}`);
    
    console.log(Array.from(body.entries()));
       
    const rawResponse = await fetch("/api/upload-topic", {
      method: "POST",
      body
    });
    const response = await rawResponse.json();
    console.log(response);
    
  }

  const elements = subtopics.map(function(subtopicData, index) {  
    return <Subtopic key={`${index}`} id={`${index}`} subtopicData={subtopicData} subtopics={subtopics} setSubtopics={setSubtopics}></Subtopic>
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
              <Typography sx={{textAlign:'center', textTransform: 'uppercase'}} variant="h6" gutterBottom component="div">
                Create a new topic
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
      
              <TextField value={title} onChange={(e)=>{ setTitle(e.target.value); }} sx={{m: '1rem 0rem', width:'50%'}} id="outlined-basic1" label="Title" variant="filled" />
              
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
            <Grid item xs={12} sx={{ display: 'flex', flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
              <Button sx={{width:'50%'}} color="success" variant="contained" onClick={ (event)=>{ uploadSubtopics() } }>Save Topic</Button>
            </Grid>
          </Grid>
        {/* </ThemeProvider> */}
      </div>
    </main>
  )
}
