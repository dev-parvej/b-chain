import { createHash } from 'crypto'

export const generateHash = (inputs: Array<any>) => {
    const hash = createHash('sha256');

    hash.update(inputs.sort().join(' '));

    return hash.digest('hex');
}