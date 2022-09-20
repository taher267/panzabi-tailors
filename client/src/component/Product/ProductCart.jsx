import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';

import {
  Favorite,
  ReadMore,
  ExpandMore as ExpandMoreIcon,
  Share,
} from '@mui/icons-material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCart({
  id,
  name,
  images,
  description,
  stock_status,
  price,
  sale_price,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img
              src="https://panzabi.com/wp-content/uploads/2020/11/cropped-panjabi-logo.png"
              alt="logo"
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
            <Link to={id}>
              <ReadMore />
            </Link>
          </IconButton>
        }
        title={name}
        // subheader={
        //   onSale ? (
        //     <Button variant="contained" color="primary">
        //       On Sale
        //     </Button>
        //   ) : (
        //     ''
        //   )
        // }
      />
      <CardMedia
        component="img"
        height="194"
        image={images?.[0]?.src}
        alt={name}
      />
      <CardContent>
        <Typography
          className="priceWraper"
          component="p"
          color="text.secondary"
        >
          {sale_price && <strong>{sale_price}</strong>}
          {sale_price ? <s>{price}</s> : <strong>{price}&#x9F3;</strong>}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
