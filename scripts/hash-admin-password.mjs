import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.log('Uso: npm run hash:admin -- "TuContraseñaSegura"');
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log(`\nADMIN_PASSWORD_HASH="${hash}"\n`);
