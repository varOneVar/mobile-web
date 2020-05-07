import CryptoJS from 'crypto-js'

const secret_key = '$!SAasaahdgs23421464c&#@$@#sadsad'

export function encrypt(word, keyStr = secret_key) {
  // 加密
  const encrypted = CryptoJS.AES.encrypt(word, keyStr, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

export const encryptReal = (word) => {
  const s = secret_key.split('').reverse().join('')
  return encrypt(encrypt(word), `${s}&#@$!$T@$%@#REFSDR@S45654651`)
}

export function decrypt(word, keyStr = secret_key) {
  // 解密
  const decrypt = CryptoJS.AES.decrypt(word, keyStr, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}

export const decryptReal = (word) => {
  const s = secret_key.split('').reverse().join('')
  return decrypt(decrypt(word, `${s}&#@$!$T@$%@#REFSDR@S45654651`))
}