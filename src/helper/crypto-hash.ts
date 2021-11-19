import { createHash } from 'crypto';

// eslint-disable-next-line import/prefer-default-export
export const generateHash = (inputs: Array<unknown>) => {
  const hash = createHash('sha256');
  hash.update(inputs.map((input) => JSON.stringify(input)).sort().join(' '));
  return hash.digest('hex');
};
