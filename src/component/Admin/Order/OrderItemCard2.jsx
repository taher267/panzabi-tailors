import { Typography } from '@mui/material';
import React from 'react';
import VerticalTabs from '../../FORM-PRACTICE/VerticalTabs';
import OrderMeasuementFields from './OrderMeasuementFields';
import OrderProduct from './OrderProduct';
import PriceFields from './PriceFields';

const OrderItemCard = ({
  //Common
  onFocus,
  gqlErrs,
  setGqlErrs,
  all_products,
  errors,
  register,
  removeGqlErrors, //2way
  //product
  setOrderProduct,
  defaultProducts = [],
  productType = 'type-1',
  fieldName = 'up_products',
  //Measurement
  measurementPrefix = '_up',
  measurementDefaultValues = {},
  designsDefaultValues = {},
  measurementFields,
  //Design
  desings,
  watching,
  type,
  //pricing
  total,
  defaultQty,
  defaultPrice,
  defaultTotal,
  productLen,
  pricingKey,
}) => {
  return (
    <>
      <Typography sx={{ margin: '10px 0' }}>পণ্য</Typography>
      {all_products ? (
        <>
          <OrderProduct
            selectedProducts={(_, v) => {
              setOrderProduct?.((p) => {
                const types = {
                  'type-1': 'up',
                  'type-2': 'down',
                };
                return {
                  ...p,
                  [types[productType]]: v?.map(({ _id, name }) => ({
                    _id,
                    name,
                  })),
                };
              });
            }}
            products={all_products?.filter((p) => p.category === productType)}
            error={errors?.[fieldName]}
            defaultProducts={defaultProducts}
          />
        </>
      ) : (
        ''
      )}
      <Typography sx={{ margin: '10px 0' }}>পরিমাপ</Typography>
      {measurementFields?.length ? (
        <OrderMeasuementFields
          {...{
            onFocus,
            gqlErrs,
            register,
            errors,
            setGqlErrs,
            defaultValues: measurementDefaultValues,
            prefix: measurementPrefix,
            removeGqlErrors,
            fields: measurementFields,
          }}
        />
      ) : (
        ''
      )}

      {desings?.length ? (
        <>
          <Typography
            sx={{
              display: 'block',
              marginY: 3,
              borderBottom: '1px solid rgba(245, 245, 245, .4)',
            }}
          >
            ডিজাইন
          </Typography>
          <VerticalTabs
            {...{
              register,
              errors,
              allDesigns: desings,
              defaultValues: designsDefaultValues,
              watching,
              design_type: type,
            }}
          />
        </>
      ) : (
        ''
      )}

      <Typography variant="h5" sx={{ marginY: 2 }}>
        মূল্য
      </Typography>
      <PriceFields
        {...{
          defaultQty,
          defaultPrice,
          defaultTotal,
          pricingKey,
          errors,
          register,
          productLen,
          total,
        }}
      />
    </>
  );
};

export default OrderItemCard;
