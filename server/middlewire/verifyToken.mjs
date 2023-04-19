import jwt from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';
const verifyToken = async () => {
  const client = JwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
  function getJwksClientKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}`,
        algorithms: ['RS256'],
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};

export default { verifyToken };
