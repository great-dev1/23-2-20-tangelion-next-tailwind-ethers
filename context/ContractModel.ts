export class ContractModel {
  contract: any;
  wallet: any;
  setEventData: any;
  constructor() {}

  setContract(contract: any) {
    this.contract = contract;
  }

  setWallet(acc: any) {
    this.wallet = acc;
  }

  setEventFunc(func: any) {
    this.setEventData = func;
  }

  getBalance(address: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const balance = await this.contract.balanceOf(address);
        resolve(balance);
      } catch (error) {
        reject(error);
      }
    });
  }

  getDay() {
    return new Promise(async (resolve, reject) => {
      try {
        const day = await this.contract.getDay();
        resolve({ day, success: true });
      } catch (error: any) {
        resolve({ success: false, reason: error.reason });
      }
    });
  }

  setDay(day: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const tx = await this.contract.setDay(day);
        await tx.wait();
        resolve({ success: true });
      } catch (error: any) {
        resolve({ success: false, reason: error.reason });
      }
    });
  }

  getAppData() {
    return new Promise(async (resolve, reject) => {
      try {
        let yieldArray: any = [0, 0];
        let earningOfGame: any = "";
        const balance = await this.contract.balanceOf(this.wallet);
        const stakeArray = await this.contract.getMyStake();
        const currentDay = await this.contract.getDay();
        const lastUpdatedDay = await this.contract.getLastUpdatedDay();
        const dailyRound = await this.contract.dailyRounds(lastUpdatedDay);
        const adjustStakingPower = await this.contract.adjustStakingPower(
          lastUpdatedDay.add(1)
        );
        const difficultyOfGame = stakeArray["difficulty"];
        const difficultyOfToday = currentDay * 40 + 1e5;
        const advantage = 100 - (100 * difficultyOfGame) / difficultyOfToday;

        if (stakeArray[0] > 0) {
          yieldArray = await this.contract.getYield();
          earningOfGame =
            Number(yieldArray[0]) +
            Number(stakeArray["stake"]) -
            stakeArray["deposit"];
        }
        const stakeData = {
          success: true,
          balance: balance.toString(),
          stakeID: stakeArray[0].toString(),
          stake: stakeArray[1].toString(),
          startDay: Number(stakeArray[2]),
          stakingPower: stakeArray[3].toString(),
          difficulty: stakeArray[4].toString(),
          completedLevels: stakeArray[5].toString(),
          deposit: stakeArray[6],
          wallet: this.wallet.toString(),
          currentDay: Number(currentDay),
          elapsedDays: currentDay - stakeArray[2].toString(),
          remainingDays: 30 - (currentDay - stakeArray[2].toString()),
          deadline1Days: 45 - (currentDay - stakeArray[2].toString()),
          deadline2Days: 60 - (currentDay - stakeArray[2].toString()),
          endDay: stakeArray[2] + 30,
          lastUpdatedDay: lastUpdatedDay.toString(),
          dailyRound: dailyRound.toString(),
          adjustStakingPower: adjustStakingPower.toString(),
          earningOfLevel: yieldArray[0],
          earningOfGame: earningOfGame,
          level: stakeArray[5] + 1,
          difficultyOfGame: stakeArray[4],
          advantage: advantage,
          difficultyOfToday: difficultyOfToday,
          earningOfCompleted: earningOfGame - yieldArray[0],
        };

        resolve({ ...stakeData });
      } catch (error: any) {
        resolve({ success: false, reason: error.reason });
      }
    });
  }

  startStaking(amount: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Action: User clicked startstaking!");
        let startTx = await this.contract.startStaking(amount);
        console.log("MetaMask: User clicked conform on Metamask!");
        let txReceipt = await startTx.wait();
        console.log("MetaMask: Transaction success!");
        let txHash = txReceipt.events[0].transactionHash;
        resolve({ txHash, success: true, blockNumber: txReceipt.blockNumber });
      } catch (error: any) {
        console.log("MetaMask: Transaction failed!");
        resolve({ reason: error.reason, success: false });
      }
    });
  }

  levelUp() {
    return new Promise(async (resolve, reject) => {
      try {
        let startTx = await this.contract.levelup();
        let txReceipt = await startTx.wait();
        let txHash = txReceipt.events[0].transactionHash;
        resolve({ txHash, success: true });
      } catch (error: any) {
        resolve({ reason: error.reason, success: false });
      }
    });
  }

  unstake() {
    return new Promise(async (resolve, reject) => {
      try {
        let startTx = await this.contract.unstake();
        let txReceipt = await startTx.wait();
        let txHash = txReceipt.events[0].transactionHash;
        resolve({ txHash, success: true, blockNumber: txReceipt.blockNumber });
      } catch (error: any) {
        resolve({ reason: error.reason, success: false });
      }
    });
  }
}
