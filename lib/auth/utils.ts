// import crypto untuk hashing
import crypto from 'crypto'

// Nama cookie untuk session
const SESSION_COOKIE = 'fullstack-nextjs-session'

/**
 * Generate hash SHA-256 dari input string
 * @param input String yang akan di-hash
 * @returns Hashed string dalam format hex
 */
function sha256(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex')
}

/**
 * Generate token acak yang aman untuk cookie
 * @returns Token dalam format base64url
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('base64url')
}

export { sha256, generateToken, SESSION_COOKIE }
