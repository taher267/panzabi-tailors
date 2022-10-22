import React from 'react';
import { useForm } from 'react-hook-form';
import fields from './arrayFields';
const NewOrder = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    // defaultValues: { ...init },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit((v) => {
          console.log(v);
        })}
      >
        {fields &&
          Object.keys(fields)?.map((primary) => {
            const primaryFields = fields[primary];
            if (typeof primaryFields === 'string') {
              return (
                <input
                  key={primary}
                  type="text"
                  {...register(primary)}
                  placeholder={primary}
                />
              );
            }
            // return (
            //   <div key={primary}>{typeof fields[primary]==='string'||'number'}</div>
            // );
          })}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewOrder;
