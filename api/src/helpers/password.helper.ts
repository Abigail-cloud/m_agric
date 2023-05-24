import * as bcrypt from 'bcrypt';

// Helper Functions
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

async function comparePassword(args: {
  password: string;
  hash: string;
}): Promise<boolean> {
  return await bcrypt.compare(args.password, args.hash);
}

export { hashPassword, comparePassword };
