import { Box, Button } from '@mui/material';
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'all' });
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
  // console.log(up, down);
  useEffect(() => {
    if (!Object.keys(desings)?.length) {
      setDesigns(designDevider(designsArrs));
    }
  }, [designsArrs]);

  return (
    <div>
      {desings?.up?.length ? (
        <Box>
          <form
            onSubmit={handleSubmit((d) => {
              console.log(d);
            })}
          >
            <VerticalTabs
              allDesigns={desings?.up}
              {...{ register, errors, up, setError, clearErrors }}
            />
            <Button type="submit" fullWidth color="primary" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      ) : (
        ''
      )}
    </div>
  );
};

export default index;
