import React from 'react';
import designs from './designs.json';
import VerticalTabs from './VerticalTabs';

const index = () => {
  // console.log(designs[0]._id?.$oid);
  return (
    <div>
      <VerticalTabs {...{ designs }} />
    </div>
  );
};

export default index;
