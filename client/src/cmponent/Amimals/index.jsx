import { useQuery } from '@apollo/client';
import Card from './Card';
import { ANIMALS_QRY } from '../graphql/Query/animal';
import { LinearProgress, Box } from '@mui/material';
export default function Animals() {
  const { loading, data } = useQuery(ANIMALS_QRY);
  return (
    <>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {data?.animals?.map((animal) => (
          <Card key={animal.id} {...animal} />
        ))}
      </div>
    </>
  );
}
