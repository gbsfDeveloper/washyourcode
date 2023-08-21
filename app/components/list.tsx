import { Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ImageList from "./imageList";

type Props = { subTopics: Subtopics[] };

export default function PinnedSubheaderList( { subTopics }: Props ) {
    console.log(subTopics);
  return (
    <List
      sx={{
        width: '100%',
        backgroundColor:"#0063CC",
        position: 'relative',
        overflow: 'auto',
        maxHeight: 1000,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {subTopics.map(( subTopic ) => (
        <li key={`section-${subTopic.subtitle}`}>
          <ul>
            <ListSubheader
                sx={{
                  backgroundColor:"#0063CC",
                  color:"white"
                }}
            >
                <Typography variant="h6"> {`${subTopic.subtitle}`} </Typography>
            </ListSubheader>
            <Divider />
            {[0].map((item) => (
              <ListItem sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'start',
              }} key={`item-${subTopic.subtitle}-${item}`}>
                <Typography> {`${subTopic.mainText}`} </Typography>
                <ImageList imageList={subTopic.imgRouteList}></ImageList>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}