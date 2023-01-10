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

  React.useEffect(() => {
    if (data?.htmlTemplate) {
      // document.body.insertAdjacentHTML('afterbegin', data?.htmlTemplate);
      document
        .querySelector('header')
        .insertAdjacentHTML('afterend', data?.htmlTemplate);
    }
  }, [data]);
  return (
    <>
      <button onClick={print}>Print</button>
      {/* {(data?.htmlTemplate && data?.htmlTemplate?.replace(/\\n/g, '')) || ''} */}
      {/* {(data?.htmlTemplate &&
        parser(data?.htmlTemplate?.replace(/\\n|"/g, ''))) ||
        ''} */}
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
      {/* <div id="wrapper">
        <div
          style={{
            width: '17%',
            display: 'block',
            float: 'left',
            fontSize: '12.5px',
            lineHeight: 2,
          }}
        >
          <p>&nbsp;</p>
          <p style={{ display: 'flex' }}>
            একছাটা <input type="checkbox" checked readOnly />
          </p>
          <p style={{ display: 'flex' }}>
            একছাটা <input type="checkbox" checked readOnly />
          </p>
          <p style={{ display: 'flex' }}>
            একছাটা <input type="checkbox" checked readOnly />
          </p>
          <p style={{ display: 'flex' }}>
            একছাটা <input type="checkbox" checked readOnly />
          </p>
        </div>
        <div style={{ width: ' 83%', display: 'inline-block' }}>
          <div style={{ display: 'flex', fontSize: ' 13.5px' }}>
            <p style={{ marginLeft: ' 25mm' }}>নং</p>
            <p style={{ marginLeft: '38mm' }}>তারিখ</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '142mm',
              maxWidth: '100%',
              padding: '0 5px',
              fontSize: '12.5px',
            }}
          >
            <div>
              <div>লম্বা</div>
              <div>&nbsp;</div>
              <div>লম্বা</div>
            </div>
            <div>
              <p>বডি</p>
              <p>বডি</p>
              <p>বডি</p>
              <p>বডি</p>
              <p>বডি</p>
            </div>
            <div>পুট</div>
            <div>
              <div>হাতা</div>
              <div>হাতা</div>
            </div>
            <div>কলার</div>
            <div>
              <div>হাতার মুহরি</div>
              <div>হাতার মুহরি</div>
            </div>
            <div>বুতাম</div>
            <div>বুতাম</div>
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
