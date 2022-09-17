import { useQuery } from '@apollo/client';
import { CATEGORIES_QRY } from '../graphql/Query/category';
import { Grid, CircularProgress, Box } from '@mui/material';
import classes from './category.module.css';
export default function Category({ setId, disabled }) {
  const { loading, error, data } = useQuery(CATEGORIES_QRY);
  //   console.log(data);
  return (
    <>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <CircularProgress />
        </Box>
      )}
      <Grid container>
        <Grid item xs={12}>
          <h4>Category:</h4>
          {loading && <CircularProgress />}
          <ul style={{ listStyle: 'none' }}>
            {data?.categories?.map((cat) => (
              <li key={cat.id}>
                <button
                  disabled={disabled === cat.id}
                  onClick={() => setId(cat.id)}
                  style={{ width: '100%' }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </>
  );
}
