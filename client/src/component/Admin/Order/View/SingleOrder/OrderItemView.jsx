import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import EditItem from './EditItem';
// import { useNavigate } from 'react-router-dom';
import { useTailors } from '../../../../context/TailorsContext';

const OrderItemView = (props) => {
  const { setPrintData } = useTailors();
  // const navigate = useNavigate();
  const {
    _id,
    measurements,
    designs,
    order_date,
    price,
    products,
    quantity,
    sample,
    connection,
    editId,
    setEditId,
    handleClickOpen,
    open,
    // k,
    order_id,
  } = props;

  //   const printView = (divName) => {
  //     const printContents = document.getElementById(divName).innerHTML;
  //     const originalContents = document.body.innerHTML;
  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //   };
  return (
    <Card variant="outlined" sx={{ marginBottom: 1 }}>
      <Box>
        <CardMedia
          component="img"
          height="40"
          image="https://panzabi.com/wp-content/uploads/2021/09/C523-1-scaled.jpg"
          alt="panzabi.com"
        />

        <CardContent>
          <Basic {...{ order_date, price, products, quantity, sample }} />
          {/* <Typography
            sx={{
              border: '1px solid #009dea',
              bgcolor: '#009dea',
              textAlign: 'center',
              width: '100px',
              float: 'right',
            }}
            onClick={() => printView(_id)}
          >
            Print
          </Typography> */}

          <Box id={_id}>
            {/* id={_id} */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant={editId === _id ? 'contained' : 'outlined'}
                onClick={() => {
                  setEditId(_id);
                  handleClickOpen();
                }}
              >
                Edit
              </Button>

              <a
                target="_blank"
                href={`/dashboard/order/print/${order_id}/${_id}`}
              >
                <Button
                  endIcon={<PrintIcon />}
                  variant={editId === _id ? 'contained' : 'outlined'}
                  // onClick={() => navigate(`/dashboard/order/print?${_id}`)}
                >
                  Print
                </Button>
              </a>
            </Box>
            {(editId === _id && (
              <EditItem {...{ handleClickOpen, setEditId, open, ...props }} />
            )) ||
              ''}
            {/* <Typography>{connection}</Typography> */}
            {(measurements?.length && (
              <>
                <MeasuremntView {...{ measurements, _id }} /> {/**k */}
              </>
            )) ||
              ''}
            {(designs?.length && (
              <>
                <Divider sx={{ marginY: 2 }} />
                <DesignView {...{ designs }} />
              </>
            )) ||
              ''}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default OrderItemView;

const MeasuremntView = ({ measurements, _id, k }) => {
  return (
    <Box id={`${_id}_${k}`}>
      <Typography variant="h6">পরিমাপ</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {measurements?.map?.((item) => (
          <Box key={item.msr_id}>
            <Typography sx={{ fontWeight: 700, color: 'var(--black)' }}>
              {item.label}
            </Typography>
            <Typography sx={{ color: 'var(--blackLight)' }}>
              {item.size}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const DesignView = ({ designs }) => {
  //   if (!designs?.items?.[0]?.length) return <></>;
  return (
    <Box>
      <Typography variant="h6">ডিজাইনঃ</Typography>
      {designs?.map?.(({ items, group }) => (
        <Box
          key={group}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {items?.map?.(({ dsn_id, label, desc }) => (
            <Box key={dsn_id} sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 700, color: 'var(--black)' }}>
                {label}
              </Typography>
              <Typography sx={{ color: 'var(--black)' }}>{desc}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const Basic = ({ order_date, products, price, quantity, sample }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Box sx={{ border: '1px solid #d3d3d3', padding: 2 }}>
        <Typography>অর্ডারের তারিখঃ {order_date}</Typography>
        <Box>
          <Typography>পণ্যঃ </Typography>
          {products?.map?.(({ name, _id }, i) => (
            <Typography key={_id}>
              ({i + 1}). {name}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={{ border: '1px solid #d3d3d3', padding: 2 }}>
        <Typography>অর্ডারের পরিমানঃ {quantity}</Typography>
        <Typography>অর্ডারের মূল্যঃ {price}</Typography>
      </Box>
    </Box>
  );
};

// const printDiv = (divName) => {
//   const printContents = document.getElementById(divName).innerHTML;
//   const originalContents = document.body.innerHTML;

//   document.body.innerHTML = printContents;

//   window.print();

//   document.body.innerHTML = originalContents;
//   return <></>;
// };
