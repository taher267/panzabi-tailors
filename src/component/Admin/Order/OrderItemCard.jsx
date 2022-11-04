import React from 'react';

const OrderItemCard = ({ all_products }) => {
  return (
    <>
      <Typography sx={{ margin: '10px 0' }}>পণ্য</Typography>
      {all_products ? (
        <>
          {/* <OrderProduct
          selectedProducts={(_, v) => {
            setOrderProduct((p) => {
              let up = v?.reduce((a, c) => [...a, c?._id], []);
              return {
                ...p,
                up,
              };

              // let down;
            });
          }}
          products={all_products?.filter((p) => p.category === 'type-1')}
          error={errors?.up_products}
        /> */}
          All Products
        </>
      ) : (
        ''
      )}
      <Typography sx={{ margin: '10px 0' }}>পরিমাপ</Typography>
      {/* {devideMeasurement?.up?.length ? (
        <OrderMeasuementField
          {...{
            onFocus,
            gqlErrs,
            register,
            errors,
            setGqlErrs,
            prefix: '_up',
            removeGqlErrors,
            fields: devideMeasurement.up,
          }}
        />
      ) : (
        ''
      )} */}
      <Typography
        sx={{
          display: 'block',
          marginY: 3,
          borderBottom: '1px solid rgba(245, 245, 245, .4)',
        }}
      >
        ডিজাইন
      </Typography>

      {/* {desings?.up?.length && (
        <VerticalTabs allDesigns={desings?.up} {...{ register, errors, up }} />
      )} */}

      <Typography variant="h5" sx={{ marginY: 2 }}>
        মূল্য
      </Typography>
      {/* <PriceFields
        {...{
          arrKey: 0,
          errors,
          register,
          productLen: orderProduct?.up?.length || 0,
          total: pricingDetail?.up?.total,
        }}
      /> */}
    </>
  );
};

export default OrderItemCard;
