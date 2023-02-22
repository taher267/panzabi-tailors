import Box from '@mui/material/Box';
import Sidebar from '../../Admin/Sidebar';
import Head from '../../graphql/Head';
// import AllOutIcon from '@mui/icons-material/AllOut';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React from 'react';
import { Typography } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';

let i = 20;
const AdminLayout = ({ children, title, rightSX, leftSX }) => {
  const [width, setWidth] = React.useState(20);
  const [isExpend, setisExpend] = React.useState(false);
  const widthHandler = () => {
    let clrInterval;
    if (width > 0) {
      clrInterval = setInterval(() => {
        if (i < 0) return clearInterval(clrInterval);
        setWidth((p) => {
          const k = i--;
          return k;
        });
      }, 0);
    } else {
      clrInterval = setInterval(() => {
        if (i > 19) return clearInterval(clrInterval);
        setWidth((p) => {
          const k = i++;
          return k;
        });
      }, 0);
    }

    // setisExpend((p) => {
    //   let incDec = 20;
    //   if (incDec !== 0) {
    //     for (let i = 20; i < 20; i--) {
    //       console.log(i);
    //       setWidth(i);
    //     }
    //   }
    //   return !p;
    // });
    // setWidth((p) => (p.l === 20 ? { l: 0, r: 100 } : { l: 20, r: 80 }));
  };
  // const match = useMediaQuery('(max-width:900px)');
  // console.log(match);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        marginTop: { md: 3 },
        position: 'relative',
      }}
    >
      <Head title={title} />
      <Typography
        onClick={widthHandler}
        sx={{
          border: '1px solid #ddd',
          color: '#009dea',
          position: 'absolute',
          marginLeft: {
            xs: `${(20 - i) * 10 > 200 ? 175 : (20 - i) * 10}px`,
            sm: `${(20 - i) * 10 > 200 ? 175 : (20 - i) * 10}px`,
            md: `${i < 2 ? 0 : i - 1.5}%`,
          },
          // marginLeft: isExpend ? '' : `${i < 0 ? 0 : i}%`,
          zIndex: 100,
          cursor: 'pointer',
        }}
      >
        {i < 2 ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
      </Typography>

      <Box
        sx={{
          width: {
            xs: i < 2 ? '200px' : 0,
            sm: i < 2 ? '200px' : 0,
            md: `${i}%`,
            lg: `${i}%`,

            // md: isExpend ? 0 : `${width}%`,
            // lg: isExpend ? 0 : `${width}%`,
          },
          background: {
            xs: '#ddd',
            sm: '#ddd',
            md: 'transparent',
          },
          paddingX: { xs: 0, sm: 0, md: 2 },
          paddingY: { xs: 2, sm: 2, md: 0 },
          marginTop: { xs: 0, sm: 0 },
          display: {
            xs: i < 2 ? 'inline-block' : 'none',
            sm: i < 2 ? 'inline-block' : 'none',
            md: i < 2 ? 'none' : 'inline-block',
            lg: i < 2 ? 'none' : 'inline-block',
            // xs: isExpend ? 'inline-block' : 'none',
            // sm: isExpend ? 'inline-block' : 'none',
            // md: isExpend ? 'none' : 'inline-block',
            // lg: isExpend ? 'none' : 'inline-block',
          },
          // position: { xs: 'absolute', sm: 'inherit' },
          position: {
            xs: i < 2 ? 'absolute' : '',
            sm: i < 2 ? 'absolute' : '',
            md: i < 2 ? 'absolute' : '',
            // xs: isExpend ? 'absolute' : '',
            // sm: isExpend ? 'absolute' : '',
            // md: isExpend ? 'absolute' : '',
          },
          zIndex: { xs: i < 2 ? 99 : '' },
          // zIndex: { xs: isExpend ? 99 : '' },
          height: '100%',
          ...leftSX,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: `${isExpend ? 100 : 100 - i}%` },
          display: { xs: 'block', sm: 'block', md: 'inline-block' },
          padding: { xs: 2, sm: 1.5 },
          height: '100%',
          ...rightSX,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
