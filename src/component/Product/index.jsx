import { useQuery } from '@apollo/client';
import { PRODUCTS_QRY } from '../graphql/Query/product';
import { LinearProgress, Box } from '@mui/material';
import ProductCart from './ProductCart';
import Category from '../Category';
import CategoryProducts from './CategoryProducts';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';

export default function Products() {
  const [categoryId, setCategoryId] = useState(0);
  const [disabled, setDisabled] = useState(0);
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(PRODUCTS_QRY, {
    variables: {
      page,
      limit: 12,
    },
  });

  return (
    <>
      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        <div>
          <Category setId={setCategoryId} disabled={disabled} />
        </div>
        <div style={{ gridColumn: '2/-1' }}>
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
            {!categoryId &&
              data?.products?.products?.map((prod) => (
                <ProductCart key={prod.id} {...prod} />
              ))}
            {categoryId ? (
              <CategoryProducts id={categoryId} setDisabled={setDisabled} />
            ) : (
              ''
            )}
          </div>
          {!categoryId && data?.products?.totalPages && (
            <Pagination
              loop={data?.products?.totalPages}
              disabled={page}
              func={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
