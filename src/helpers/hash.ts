import { BinaryLike, pbkdf2Sync, randomBytes } from 'crypto'

const iterations = 10000
const keylen = 32
const digest = 'sha512'

export function hash(data: string) {
    const salt = randomBytes(32).toString('base64')
    const hash = pbkdf2Sync(data, salt, iterations, keylen, digest).toString('hex')

    return {
        salt: salt,
        hash: hash,
        iterations: iterations,
    }
}

export function compare(data: string, hash: string, salt: string) {
    console.log("hash compare", pbkdf2Sync(data, salt, iterations, keylen, digest).toString(`hex`))
    return pbkdf2Sync(data, salt, iterations, keylen, digest).toString(`hex`) === hash
}