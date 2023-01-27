import { config } from 'dotenv';
config({ path: './config/.env' });
import mg from 'mongoose';
mg.set('strictQuery', true);
import { lookup } from 'dns';
const uris = {
  cpPri: process.env.MONGO_STR,
  cpPri2: process.env.MONGO_STR_ORDER,
  local: `mongodb://localhost:27017/panzabiDotComTailors`,
  local2: `mongodb://localhost:27017/panzabiDotComTailorsOrders`,
};

export default () => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      lookup('panzabi.com', (e) => {
        if (e) {
          const con = mg.connect(uris['local']);
          // mg.orders = mg.createConnection(uris['local2']);
          return resolve(con);
        }
        const con = mg.connect(uris['cpPri']);
        // mg.orders = mg.createConnection(uris['cpPri2']);
        return resolve(con);
      });
    });
  } else {
    // const con = mg.connect(uris['cpPri']);
    // con.orders = mg.createConnection(uris['cpPri2']);
    // return con;
    return new Promise((resolve) => {
      mg.connect(uris['cpPri']);
      // mg.orders = mg.createConnection(uris['cpPri2']);
      return resolve(mg);
    });
  }
};
