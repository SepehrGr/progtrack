const encode = async password => {
  const enc = new TextEncoder()
  const encoded = enc.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', encoded)
  const hashArray = Array.from(new Uint8Array(hash))
  const hashedPassword = btoa(String.fromCharCode.apply(null, hashArray))
  return hashedPassword
}

export default encode
