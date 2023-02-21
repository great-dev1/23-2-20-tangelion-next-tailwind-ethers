import { useState, useEffect } from 'react';
import { useAppContext } from "@/context"
import { connect } from 'http2';


const StartFarming = () => {

  const { connected, contract } = useAppContext()
  const { getBalance } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)    //transaction pending
  const [startFarming, setStartFarming] = useState<any>({
    farmer: "Loading...",
    farmingID: "Loading...",
    startDay: "Loading...",
    farmingPower: "Loading...",
  }) // event

  const [txSuccess, setTxSuccess] = useState<boolean>(false)  //transaction success
  const [txFailed, setTxFailed] = useState<boolean>(false)    //transaction failed
  const [txHash, setTxHash] = useState<string>("")
  const [farmInfo, setFarmInfo] = useState<any>([])         //farminfo

  const handleStartFarming = async () => {

    const currentBalacne = await getBalance();
    if (true)
      try {
        setLoading(true)
        let startTx = await contract.startFarming("200000000")
        contract.on(
          "StartFarming",
          (farmer: string, farmingID: string, startDay: string, farmingPower: string) => {
            setStartFarming({
              farmer: farmer,
              farmingID: farmingID,
              startDay: startDay,
              farmingPower: farmingPower,
            })
          }
        )
        console.log('stakeTx :>> ', startTx);
        let txReceipt = await startTx.wait()
        setTxHash(txReceipt.events[0].transactionHash)
        setTxSuccess(true)
        setTxFailed(false)
      } catch (err: any) {
        console.log("Transaction Failed!", (err.reason))
        setLoading(false)
        setTxSuccess(false)
        setTxFailed(true)
      }
    setLoading(false)
  }

  const getFarmInfo = async () => {
    const arrayVal = await contract.getMyFarm();
    const farmInfo = {
      farmingID: arrayVal[0].toString(),
      lockedAmount: arrayVal[1].toString(),
      startDay: arrayVal[2].toString(),
      farmingPower: arrayVal[3].toString(),
      difficulty: arrayVal[4].toString(),
      completedLevels: arrayVal[5].toString(),
      deposit: arrayVal[6].toString(),
    }
    // console.log("FARM_INFO=========>", farmInfo);
    setFarmInfo(farmInfo);
  }

  const getDay = async () => {
    const currentDay = await contract.getDay();
    // console.log('currentDay :>> ', currentDay);
  }

  useEffect(() => {

    if (connected) setInterval(() => {
      getDay()
      getFarmInfo()
    }, 3000)
  }, [connected])

  return (
    <>
      <button onClick={handleStartFarming}>startFarming</button>
      <br></br>
      {JSON.stringify(farmInfo)}
    </>
  )
}

export default StartFarming