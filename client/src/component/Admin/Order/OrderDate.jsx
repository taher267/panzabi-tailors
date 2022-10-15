import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
const dt = moment();

export default function OrderDate() {
  const [value, setValue] = React.useState();
  const options = {
    inputFormat: 'YYYY-MM-DD',
    dayOfWeekFormatter: (day) => day.substring(0, 3).toUpperCase(),
    maxDate: dt,
    showDaysOutsideCurrentMonth: false,
    onChange: (val) => setValue(val),
    renderInput: (params) => <TextField {...params} variant="standard" />,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker label="Order Date" value={value} {...options} />
    </LocalizationProvider>
  );
}
