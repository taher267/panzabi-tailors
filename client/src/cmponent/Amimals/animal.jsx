import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ANIMAL_QRY } from '../graphql/Query/animal';
import { LinearProgress, Box, Rating, Typography, Button } from '@mui/material';
export default function Animal() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(ANIMAL_QRY, {
    variables: {
      id: parseInt(id),
    },
  });

  return (
    <div>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && data?.animal && <Detail {...data.animal} />}
    </div>
  );
}

export const Detail = ({
  title,
  image,
  rating,
  price,
  description,
  stock,
  onSale,
}) => {
  return (
    <div>
      <p>{title}</p>
      <div style={{ display: 'flex', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <ol>
            {description?.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ol>
          <div>
            <Typography component="legend">Rating</Typography>
            <Rating name="read-only" value={rating} readOnly />
            <p>{price}</p>
            <p>{stock}</p>
            {onSale && <Button variant="contained">Sale</Button>}
          </div>
        </div>
        <div>
          <img style={{ width: '100%' }} src={image} alt={title} />
        </div>
      </div>
    </div>
  );
};
