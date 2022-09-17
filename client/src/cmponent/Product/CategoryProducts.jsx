import { useQuery } from '@apollo/client';
import { CATEGORY_PRODUCTS } from '../graphql/Query/product';
import { LinearProgress, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCart from './ProductCart';
import Pagination from '../Pagination/Pagination';
export default function CategoryProducts({ id, setDisabled }) {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(CATEGORY_PRODUCTS, {
    variables: {
      id: parseInt(id),
    },
  });
  let category = data?.category;
  useEffect(() => {
    setDisabled(id);
  }, [loading]);
  return (
    <>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {data?.category && (
        <div>
          <div style={{ borderBottom: '' }}>
            <p style={{ borderBottom: '1px solid #ddd' }}>
              Category: {category?.name}, {category?.count} Pc(s)
            </p>
            {category?.description && <p>{category?.description}</p>}
          </div>
          <div
            style={{
              display: 'grid',
              gap: '5px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}
          >
            {category?.products?.products?.map((prod) => (
              <ProductCart key={prod.id} {...prod} />
            ))}
          </div>
          {category?.products?.totalPages && (
            <Pagination
              loop={category?.products?.totalPages}
              disabled={page}
              func={setPage}
            />
          )}
        </div>
      )}
      {/* <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {data?.products?.map((prod) => (
          <ProductCart key={prod.id} {...prod} />
        ))}
      </div> */}
    </>
  );
}
