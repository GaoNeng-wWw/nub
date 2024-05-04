import { createHash, randomBytes } from 'node:crypto'

export const usePassword = (password: string) => {
  const hash = createHash('sha256');
  return hash.update(password).digest('hex').toString()
}

export const useRandomPassword = (len: number) => randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len)
