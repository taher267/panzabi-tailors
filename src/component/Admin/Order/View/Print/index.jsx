import React from 'react';
import parser from 'html-react-parser';
import './print.css';
import { useLocation, useParams } from 'react-router-dom';
import useGetQurey from '../../../../hooks/gql/useGetQurey';

const Print = () => {
  const { id, keey } = useParams();
  const location = useLocation();
  const { data, error, loading } = useGetQurey(
    'ORDER_ITEM',
    {
      id,
      key: keey,
    },
    'getOrderItem'
  );
  // console.log(data);
  return (
    <>
      <button onClick={print}>Print</button>
      {/* {(data?.htmlTemplate && data?.htmlTemplate?.replace(/\\n/g, '')) || ''} */}
      {(data?.htmlTemplate &&
        parser(data?.htmlTemplate?.replace(/\\n|"/g, ''))) ||
        ''}
      {/* <div className="contentData">
        <div className="printCard">
          <div
            className="productsCard"
            style={{
              width:
                data?.connection === 'down'
                  ? '38mm'
                  : data?.connection === 'up'
                  ? '23mm'
                  : '',
            }}
          >
            {data?.products &&
              Object.values(data?.products).map?.(({ name }, i) => (
                <p key={i}>{name}</p>
              ))}
          </div>
          <div className="printDesign">
            {data?.measurements &&
              Object.values(data?.measurements).map?.(({ label, size }, i) => (
                <div key={i}>
                  <p>{label}</p>
                  <p>{size}</p>
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </>
  );
};
// Object.values(data?.measurements).map?.((item, i) =><div key={i}>{}</div>
export default Print;

function printDiv(divName) {
  const printContents = document.getElementById(divName).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  print();
  document.body.innerHTML = originalContents;
}
