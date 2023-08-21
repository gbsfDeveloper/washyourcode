import { Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ImageList from "./imageList";

type Props = { topics: Topic[] };

export default function PinnedSubheaderList( { topics }: Props ) {
    console.log(topics);
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
      {topics.map((topic) => (
        <li key={`section-${topic.subtitle}`}>
          <ul>
            <ListSubheader
                sx={{
                  backgroundColor:"#0063CC",
                  color:"white"
                }}
            >
                <Typography variant="h6"> {`${topic.subtitle}`} </Typography>
            </ListSubheader>
            <Divider />
            {[0].map((item) => (
              <ListItem sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'start',
              }} key={`item-${topic.subtitle}-${item}`}>
                <Typography> {`${topic.mainText}`} </Typography>
                <ImageList imageList={topic.imgRouteList}></ImageList>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}