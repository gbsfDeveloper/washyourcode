import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

type Props = { imageList: imgPropertiesForTopics[] };

export default function TitlebarBelowImageList({ imageList }:Props ): JSX.Element {
  return (
    <ImageList sx={{ width: 500 }} cols={2}>
      {imageList.map((item) => (
        <ImageListItem key={item.language}>
          <img
            src={`${item.imgRoute}?w=250&fit=crop&auto=format`}
            srcSet={`${item.imgRoute}?w=250&fit=crop&auto=format&dpr=2 2x`}
            alt={item.language}
            loading="lazy"
          />
          <ImageListItemBar
            // title={item.title}
            subtitle={<span><b>Language:</b> {item.language}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}