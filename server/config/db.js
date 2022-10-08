import mg from 'mongoose';
import { lookup } from 'dns';
const cpUri = `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailors`;
const local = `mongodb://localhost:27017/panzabiDotComTailors`;
const uris = {
  cpPri: `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailors`,
  cpPri2: `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailorsOrders`,
  local: `mongodb://localhost:27017/panzabiDotComTailors`,
  local2: `mongodb://localhost:27017/panzabiDotComTailorsOrders`,
};
export default () => {
  //   return mg.connect(uris['local']);
  return new Promise((resolve) => {
    lookup('panzabi.com', (e) => {
      if (e) {
        mg.connect(uris['local']);
        mg.orders = mg.createConnection(uris['local2']);
        return resolve(mg);
      }
      mg.connect(uris['cpPri']);
      mg.orders = mg.createConnection(uris['cpPri2']);
      return resolve(mg);
    });
  });
};
