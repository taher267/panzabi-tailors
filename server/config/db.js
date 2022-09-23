import mg from 'mongoose';
const cpUri = `mongodb+srv://panzabi-tailors:tailors-panzabi@cluster0.k06iwap.mongodb.net/panzabiDotComTailors`;
const local = `mongodb://localhost:27017/panzabiDotComTailors`;

export default mg.connect(cpUri);
