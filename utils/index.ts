const getShortAddress = (address: string) => {
  if (address) {
    return address.slice(0, 5) + "..." + address.slice(38);
  }
  return "";
};

// 12345678 => 1234.5678
const difficultyToString = (para: any) => {
  const num = BigInt(para);
  const integer = num / BigInt(1e5);
  const rest = (num % BigInt(1e5)) / BigInt(10) + BigInt(1e5);
  return integer.toString() + "." + rest.toString().slice(2);
};

// 123456789 => 1 234.56789
const PiqToString = (para: any = 0) => {
  const num = BigInt(Math.trunc(para.toString()));
  const integer = num / BigInt(1e8);
  const rest = (num % BigInt(1e8)) + BigInt(1e9);
  return customFormat(integer.toString()) + "." + rest.toString().slice(2);
};

// 123456789 => 1.23456789
const bigintToString = (para: any) => {
  const num = BigInt(para);
  const integer = num / BigInt(1e8);
  const rest = (num % BigInt(1e8)) + BigInt(1e9);
  return integer.toString() + "." + rest.toString().slice(2);
};

// 1234.5678 => 1234.56
const getPercentage = (para: any = 0) => {
  const num = Math.trunc(para * 100);
  const integer = Math.trunc(num / 100);
  const rest = (num % 100) + 100;
  return integer.toString() + "." + rest.toString().slice(1);
};

// estimated rewards
const getEstimatedRewards = (deposit: any, temp: any) => {
  let estimatedstakingAdvantage;
  const stakingPower = (deposit * 1e8) / temp.difficultyOfToday;
  const totalStakingPower =
    Number(temp.dailyRound) + Number(temp.adjustStakingPower);

  if (totalStakingPower === 0) {
    estimatedstakingAdvantage = 4000 * 30;
  } else {
    estimatedstakingAdvantage =
      (stakingPower * 4000 * 30) /
      (Number(totalStakingPower) + Number(stakingPower));
  }
  return Number.parseInt((estimatedstakingAdvantage * 1e8).toString());
};

// 12345678.12345678 => 12 345 678.12345678
const customFormat = (n: any, dp = 0) => {
  var s = "" + Math.floor(n),
    d = n % 1,
    i = s.length,
    r = "";
  while ((i -= 3) > 0) {
    r = " " + s.substring(i, i + 3) + r;
  }
  return (
    s.substring(0, i + 3) +
    r +
    (d ? "." + Math.round(d * Math.pow(10, dp || 8)) : "")
  );
};

const cookAppData = (temp: any) => {
  const advantage =
    temp.advantage >= 10
      ? temp.advantage.toString().slice(0, 8)
      : temp.advantage.toString().slice(0, 7);
  let lastUpdate,
    delta = (temp.currentDay - temp.lastUpdatedDay).toString();
  const stake = Number(temp.deposit) + temp.earningOfGame - temp.earningOfLevel;

  if (delta === "0") lastUpdate = "today";
  else if (delta === "1") lastUpdate = "yesterday";
  else lastUpdate = `${delta} days ago`;

  return {
    ...temp,
    balance: PiqToString(BigInt(temp.balance)),
    deposit: PiqToString(temp.deposit),
    earningOfLevel: PiqToString(temp.earningOfLevel),
    earningOfGame: PiqToString(temp.earningOfGame),
    earningOfCompleted: PiqToString(temp.earningOfCompleted),
    stake: PiqToString(stake),
    difficultyOfGame: difficultyToString(temp.difficultyOfGame),
    difficultyOfToday: difficultyToString(temp.difficultyOfToday),
    lastUpdate: lastUpdate,
    advantage,
  };
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export {
  getShortAddress,
  PiqToString,
  bigintToString,
  getPercentage,
  getEstimatedRewards,
  cookAppData,
  sleep,
};
