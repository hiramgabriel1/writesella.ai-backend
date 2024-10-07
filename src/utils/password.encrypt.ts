import * as bcrypt from "bcrypt"

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  
  return isMatch;
};
