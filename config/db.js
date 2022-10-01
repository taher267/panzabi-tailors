import mg from 'mongoose';
import { lookup } from 'dns';
import { rejects } from 'assert';
const cpUri = `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailors`;
const local = `mongodb://localhost:27017/panzabiDotComTailors`;
const uris = {
  cpPri: `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailors`,
  local: `mongodb://localhost:27017/panzabiDotComTailors`,
};
export default () => {
  //   return mg.connect(uris['local']);
  return new Promise((resolve) => {
    lookup('panzabi.com', (e) => {
      if (e) {
        return resolve(mg.connect(uris['local']));
      }
      return resolve(mg.connect(uris['cpPri']));
    });
  });
};
