import { Typography } from '@mui/material';
import React from 'react';
import VerticalTabs from '../../FORM-PRACTICE/VerticalTabs';
import Field2 from '../../ui/Field2';
import OrderMeasuementFields from './OrderMeasuementFields';
import OrderProduct from './OrderProduct';
import PriceFields from './PriceFields';

const OrderItemCard = ({
  //Common
  watch,
  mainKey,
  Controller,
  control,
  onFocus,
  gqlErrs,
  setGqlErrs,
  errors,
  register,
  removeGqlErrors, //2way
  //product
  products,
  prodType,
  // setOrderProduct,
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

  pricingKey,
  productLabel,
}) => {
  const KeyFilter = mainKey ? `${mainKey}.` : '';
  // console.log(KeyFilter, 'KeyFilter');
  const productLen = watch?.(`${KeyFilter}products`)?.length;
  const defaultProds = watch?.(`${KeyFilter}products`);
  return (
    <>
      <Typography sx={{ margin: '10px 0' }}>পণ্য</Typography>
      {products ? (
        <>
          {/* {console.log(defaultProducts)} */}
          <Field2
            control={control}
            Controller={Controller}
            type="multi_select"
            label="Product"
            predefined={[
              ...products?.filter?.((item) =>
                defaultProducts.includes?.(item._id)
              ),
            ]}
            placeholder="Product 01"
            multiSelectLebel="name"
            name={`${KeyFilter}products`}
            sx={{ marginY: 2 }}
            validation="required→true←Product is mandatory!"
            params="select→true"
            options={products}
          />
          {/* <OrderProduct
            fullWidth={true}
            selectedProducts={(_, v) =>
              setOrderProduct?.((p) => {
                if (prodType) {
                  return {
                    ...p,
                    [prodType]: v,
                  };
                }
                return v;
              })
            }
            error={errors?.[fieldName]}
            {...{ defaultProducts, products, productLabel }}
          /> */}
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
