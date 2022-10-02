import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useState, useEffect } from 'react';
import csses from './account.module.css';

export default function AccountSummary({
  data,
  report,
  setReport,
  initReport,
}) {
  const [mnt] = useState(moment());
  useEffect(() => {
    if (data) {
      setReport({ ...initReport });
      for (const item of data) {
        setReport((p) => {
          return {
            ...p,
            cash_in: p?.cash_in + item.cash_in,
            cash_out: p?.cash_out + item.cash_out,
            today_cash_in:
              mnt.format('YYYY-MM-DD') ===
              moment(item.date).format('YYYY-MM-DD')
                ? p?.today_cash_in + item?.cash_in
                : p?.today_cash_in,

            today_cash_out:
              mnt.format('YYYY-MM-DD') ===
              moment(item.date).format('YYYY-MM-DD')
                ? p?.today_cash_out + item?.cash_out
                : p?.today_cash_out,

            month_of_cash_in:
              mnt.startOf('month').format('YYYY-MM-DD') &&
              mnt.endOf('month').format('YYYY-MM-DD')
                ? p?.month_of_cash_in + item?.cash_in
                : p?.month_of_cash_in,

            month_of_cash_out:
              mnt.startOf('month').format('YYYY-MM-DD') &&
              mnt.endOf('month').format('YYYY-MM-DD')
                ? p?.month_of_cash_out + item?.cash_out
                : p?.month_of_cash_out,
          };
        });
      }
    }
  }, [data]);
  return (
    <Box sx={{ border: '1px solid #ddd', marginBottom: '5px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Accounts
      </Typography>
      <Box className={csses.summaryBox}>
        <div>
          <Typography variant="subtitle1">
            Total Cash IN {report?.cash_in}
          </Typography>
          <Typography variant="subtitle1">
            Total Cash out {report?.cash_out}
          </Typography>{' '}
        </div>
        <div>
          <Typography variant="subtitle1">
            {mnt.format('MMMM')} Cash In {report?.month_of_cash_in}
          </Typography>
          <Typography variant="subtitle1">
            {mnt.format('MMMM')} Cash out {report?.month_of_cash_out}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
            Today Cash In {report?.today_cash_in}
          </Typography>
          <Typography variant="subtitle1">
            Today Cash out {report?.today_cash_out}
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
