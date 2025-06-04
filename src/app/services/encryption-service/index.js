const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Generar par de llaves RSA (se genera cada vez que arranca el servidor)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,           // 2048 bits de seguridad
  publicKeyEncoding: {
    type: 'pkcs1',               // “PKCS#1” para llave publica (PEM)
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',               // “PKCS#1” para llave privada (PEM)
    format: 'pem'
  }
});

// Guardar llaves en archivos
const keysDir = path.join(__dirname, 'keys');
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}
fs.writeFileSync(path.join(keysDir, 'private_key.pem'), privateKey);
fs.writeFileSync(path.join(keysDir, 'public_key.pem'), publicKey);

app.post('/api/encrypt', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Falta campo "text" de tipo string.' });
  }

  try {
    // Convertir texto a Buffer UTF-8
    const bufferTexto = Buffer.from(text, 'utf8');

    // Cifrar con la llave publica usando OAEP y SHA-256
    const encryptedBuffer = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      bufferTexto
    );

    // Devolver en Base64
    return res.json({ encrypted: encryptedBuffer.toString('base64') });
  } catch (err) {
    console.error('Error al cifrar:', err);
    return res.status(500).json({ error: 'Error interno al cifrar.' });
  }
});

app.post('/api/decrypt', (req, res) => {
  const { encrypted } = req.body;
  if (typeof encrypted !== 'string') {
    return res.status(400).json({ error: 'Falta campo "encrypted" de tipo string (Base64).' });
  }

  try {
    // Convertir Base64 a Buffer
    const bufferEncrypted = Buffer.from(encrypted, 'base64');

    // Descifrar con la llave privada usando OAEP y SHA-256
    const decryptedBuffer = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      bufferEncrypted
    );

    return res.json({ decrypted: decryptedBuffer.toString('utf8') });
  } catch (err) {
    console.error('Error al descifrar:', err);
    return res.status(500).json({ error: 'Error interno al descifrar.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔒 encryption-service escuchando en http://localhost:${PORT}`);
  console.log(`🔑 Llave pública guardada en /keys/public_key.pem`);
  console.log(`🔑 Llave privada guardada en /keys/private_key.pem`);
});
