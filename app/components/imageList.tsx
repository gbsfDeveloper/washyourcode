import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarBelowImageList(): JSX.Element {
  return (
    <ImageList sx={{ width: 500 }} cols={2}>
      {itemData.map((item) => (
        <ImageListItem key={item.language}>
          <img
            src={`${item.img}?w=250&fit=crop&auto=format`}
            srcSet={`${item.img}?w=250&fit=crop&auto=format&dpr=2 2x`}
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

const itemData = [
  {
    img: '/assets/imgs/section_2_img_1.png',
    // title: 'Breakfast',
    language: 'Javascript (JS)',
  },
  {
    img: '/assets/imgs/section_2_img_1.png',
    // title: 'Burger',
    language: 'Typescript (TS)',
  },
];