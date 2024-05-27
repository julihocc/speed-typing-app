import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const encrypt = (password: string) => {
  return bcrypt.hashSync(password, salt);
};
