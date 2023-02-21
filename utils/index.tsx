
const getShortAddress = (address: string) => {
  if (address)
    return address.slice(0, 5) + "..." + address.slice(38)
  else return ''
}

//bigint 12345678  =====> string 1234.5678
const bigintToString4 = (balance: bigint) => {
  const integer = balance / BigInt(1e8)
  const rest = (balance % BigInt(1e8)) / BigInt(1e4) + BigInt(1e5)
  return integer.toString() + "." + rest.toString().slice(2)
}

const bigintToFullrange = (balance: bigint) => {
  const integer = balance / BigInt(1e8)
  const rest = (balance % BigInt(1e8)) + BigInt(1e9)
  return integer.toString() + "." + rest.toString().slice(2)
}

export {
  getShortAddress,
  bigintToString4,
  bigintToFullrange
}