import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12); // How strong the password is based in the number (the longer, the safer)
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}