const getShortAddress = (address: string) => {
  if (address)
    return address.slice(0, 5) + "..." + address.slice(38)
  else return ""
}

// 12345678  => string 1234.5678
const bigintToString4 = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e8)
  const rest = (num % BigInt(1e8)) / BigInt(1e4) + BigInt(1e5)
  const temp = customFormat(integer.toString()) + "." + rest.toString().slice(2)
  return temp
}

// 12345678 => 1234.5678
const difficultyToString = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e5)
  const rest = (num % BigInt(1e5)) / BigInt(10) + BigInt(1e5)
  return integer.toString() + "." + rest.toString().slice(2)
}

// 1234/56789 => 1 234.56789
const PitToString = (para: any = 0) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e8)
  const rest = (num % BigInt(1e8)) + BigInt(1e9)
  return customFormat(integer.toString()) + "." + rest.toString().slice(2)
}

// 123456789 => 1.23456789
const bigintToString = (para: any) => {
  const num = BigInt(para)
  const integer = num / BigInt(1e8)
  const rest = (num % BigInt(1e8)) + BigInt(1e9)
  return (integer.toString() + "." + rest.toString().slice(2))
}

// 1234.5678 => 1234.56
const getPercentage = (para: any = 0) => {
  const num = Math.trunc(para * 100)
  const integer = Math.trunc(num / (100))
  const rest = (num % (100)) + (100)
  return integer.toString() + "." + rest.toString().slice(1)
}

// estimated earning
const getEstEarning = (deposit: any, temp: any) => {
  let estimatedfarmingAdvantage
  const farmingPower = deposit * 1e8 / temp.difficultyOfToday
  const totalFarmingPower = Number(temp.dailyRound) + Number(temp.adjustFarmingPower)

  if (totalFarmingPower == 0) {
    estimatedfarmingAdvantage = 4000 * 30
  } else {
    estimatedfarmingAdvantage = farmingPower * 4000 * 30 / (Number(totalFarmingPower) + Number(farmingPower))
  }
  return PitToString(Number.parseInt((estimatedfarmingAdvantage * 1e8).toString()))
}

// 12345678.12345678 => 12 345 678.12345678
const customFormat = (n: any, dp = 0) => {
  var s = "" + Math.floor(n),
    d = n % 1,
    i = s.length,
    r = ""
  while ((i -= 3) > 0) {
    r = " " + s.substring(i, i + 3) + r
  }
  return (
    s.substring(0, i + 3) +
    r +
    (d ? "." + Math.round(d * Math.pow(10, dp || 8)) : "")
  )
}

const cookAppData = (temp: any) => {
  const advantage = temp.advantage >= 10 ? temp.advantage.toString().slice(0, 8) : temp.advantage.toString().slice(0, 7)
  let lastUpdate, delta = (temp.currentDay - temp.lastUpdatedDay).toString()

  if (delta === "0") lastUpdate = "today"
  else if (delta === "1") lastUpdate = "yesterday"
  else lastUpdate = `${delta} days ago`

  return {
    ...temp,
    balance: bigintToString4(BigInt(temp.balance)),
    deposit: PitToString(temp.deposit),
    earningOfLevel: PitToString(temp.earningOfLevel),
    earningOfGame: PitToString(temp.earningOfGame),
    difficultyOfGame: difficultyToString(temp.difficultyOfGame),
    difficultyOfToday: difficultyToString(temp.difficultyOfToday),
    advantage,
    lastUpdate: lastUpdate,
  }
}

export {
  getShortAddress,
  bigintToString4,
  PitToString,
  bigintToString,
  getPercentage,
  getEstEarning,
  cookAppData,
}
