import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import clientQuery from '../../hooks/gql/usePromissQurey';
import defaultMeasurementsShape from '../../../utils/defaultMeasurementsShape';
import defaultDesignsShape from '../../../utils/defaultDesignsShape';

const SearchForCopy = ({
  customerID,
  setLoadingFetchingOrders,
  loadingFetchingOrders,
  setThisCustomerOrders,
  setCopyOrderProduct,
  setCopyMeasurements,
  thisCustomerOrders,
  setOrderProduct,
  setSearchItems,
  setCopyDesigns,
  searchItems,
  setValue,
}) => {
  React.useEffect(() => {
    (async () => {
      try {
        setLoadingFetchingOrders(true);
        setSearchItems([]);
        setLoadingFetchingOrders({});
        const { data } = await clientQuery('USER_ORDERS_ITEMS', {
          key: 'customer',
          value: customerID,
          options: {
            select:
              'order_items order_date order_status delivery_date createdAt order_no',
          },
        });
        const search = [];
        const obj = data?.allOrders?.reduce?.(
          (a, { order_items, createdAt, order_no }) => {
            for (const item of order_items || []) {
              let products = item?.products?.reduce?.(
                (p_a, { name }, i, all) => {
                  p_a += `${name}${all.length === i + 1 ? '' : ', '}`;
                  return p_a;
                },
                ''
              );
              search.push({
                id: item._id,
                createdAt,
                order_no,
                connection: item.connection,
                label: `${item._id} => ${order_no} - ${products}`,
              });
              a[item._id] = { ...item, order_no, createdAt };
            }
            return a;
          },
          {}
        );
        setSearchItems(search);
        setThisCustomerOrders(obj || {});
      } catch (e) {
        setThisCustomerOrders([]);
        console.log(e?.message);
      } finally {
        setLoadingFetchingOrders(false);
      }
    })();
  }, []);

  const setItemValues = (item) => {
    let selectedData = thisCustomerOrders?.[item];
    let connection = selectedData.connection;
    // measurements_up.632ea691a3a5bd3d881c565c.size
    let key = '';
    if (connection === 'up') key = '0';
    if (connection === 'down') key = '1';

    if (selectedData?.measurements?.length) {
      setCopyMeasurements(
        defaultMeasurementsShape(selectedData?.measurements, 'msr_id', 'size')
      );
      // for (const item of selectedData.measurements) {
      //   // setValue(`measurements_${connection}.${item.msr_id}.size`, item.size);

      // }
    }
    if (selectedData?.designs?.length) {
      setCopyDesigns(defaultDesignsShape(selectedData?.designs));
    }
    if (selectedData?.products?.length) {
      setCopyOrderProduct((p) => {
        return {
          ...p,
          [connection]: selectedData?.products?.map?.(({ _id, name }) => ({
            _id,
            name,
          })),
        };
      });

      // setCopyOrderProduct((p) => ({
      //   ...p,
      //   [connection]: selectedData?.products?.map?.(({ _id, name }) => ({
      //     _id,
      //     name,
      //   })),
      // }));

      setCopyOrderProduct((p) => ({
        ...p,
        [key]: selectedData?.products?.map?.(({ _id, name }) => ({
          _id,
          name,
        })),
      }));
      setValue(
        `${key}.products`,
        selectedData?.products?.map?.(({ _id, name }) => ({ _id, name }))
      );
      // if (connection === 'up')
      //   setValue(
      //     `0.products`,
      //     selectedData?.products?.map?.(({ _id, name }) => ({ _id, name }))
      //   );
      // else if (connection === 'down')
      //   setValue(
      //     `1.products`,
      //     selectedData?.products?.map?.(({ _id, name }) => ({ _id, name }))
      //   );
      // setOrderProduct((p) => ({
      //   ...p,
      //   [connection]: selectedData?.products,
      // }));
    }
  };
  const setDesignsValues = () => {};
  const setProductsValues = () => {};
  return (
    <>
      <Box sx={{ display: '', gap: 1 }}>
        <Box sx={{ border: 1, padding: 1, borderRadius: 2 }}>
          <Typography variant="h5">পূর্ববর্তী পরিমাপ যোগ</Typography>
          {(!loadingFetchingOrders && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={searchItems}
              getOptionLabel={(item) => item.label}
              onChange={(_, v) => {
                if (v) {
                  setItemValues(v.id);
                }
                // setValue('checkboxUp', false);
                // console.log(v);
                // setValue('checkboxUp', true);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="পূর্ববর্তী পরিমাপ যোগ"
                />
              )}
            />
          )) ||
            ''}
        </Box>
        {/* <Box sx={{ border: 1, padding: 1, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">সালোয়ার, পাজামা</Typography>
            <Typography>Two</Typography>
          </Box>
          <Typography>
            Facilis culpa. Voluptas, quia vero quam et provident voluptate sint
            optio quos repudiandae illo?
          </Typography>
        </Box> */}
      </Box>
    </>
  );
};

export default SearchForCopy;
