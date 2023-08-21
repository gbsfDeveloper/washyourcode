import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageList from "./imageList";
import List from "./list";

type Props = { title: string , topics: Topic[] };

export default function BasicAccordion({ title, topics } : Props): JSX.Element {
  
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor:"#0063CC",
          color:"white"
        }}
      >
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">{ title }</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <List topics={topics}></List>
        </AccordionDetails>

      </Accordion>
    </div>
  );
}