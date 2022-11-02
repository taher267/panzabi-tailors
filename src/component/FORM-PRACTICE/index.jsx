import { Box, Button, Checkbox } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import designDevider from '../../component/utils/designDevider';

import designsArrs from './designs.json';
import VerticalTabs from './VerticalTabs';

const index = () => {
  const {
    handleSubmit,
    register,
    control,
    unregister,
    watch,
    // setError,
    // clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      checkboxUp: false,
      checkboxDown: false,
    },
  });
  // console.log(errors);
  const [desings, setDesigns] = useState({
    // up: {}, down: {}
  });
  useFieldArray({ control, name: 'up', name: 'dwon' });
  const up = useWatch({
    name: 'up',
    control,
  });
  const down = useWatch({
    name: 'down',
    control,
  });
  const checkboxUp = watch('checkboxUp');
  const checkboxDown = watch('checkboxDown');
  useEffect(() => {
    if (!Object.keys(desings)?.length) {
      setDesigns(designDevider(designsArrs));
    }
  }, [designsArrs]);

  return (
    <div>
      <Box>
        <form
          onSubmit={handleSubmit((d) => {
            console.log(d);
          })}
        >
          <Checkbox
            onClick={(e) => e.target?.checked === false && unregister('up')}
            sx={{ color: errors?.checkboxUp ? 'red' : '' }}
            {...register('checkboxUp')}
          />
          {desings?.up?.length && checkboxUp && (
            <VerticalTabs
              allDesigns={desings?.up}
              {...{ register, errors, up }}
            />
          )}
          <Checkbox
            onClick={(e) => e.target?.checked === false && unregister('down')}
            sx={{ color: errors?.checkboxDown ? 'red' : '' }}
            {...register('checkboxDown')}
          />
          {/* {desings?.down?.length && (
            <VerticalTabs
              allDesigns={desings?.down}
              {...{ register, errors, down }}
            />
          )} */}
          <Button type="submit" fullWidth color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default index;
