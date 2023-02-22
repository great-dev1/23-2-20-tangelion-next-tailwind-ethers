import { useState, useEffect } from "react"
import Image from "next/image"
import { useAppContext } from "@/context"
import Button from "../Button"

const NewGame = () => {
  const [deposit, setDeposit] = useState<string>("1")
  const [estimate, setEstimate] = useState<string>("0.302")
  const [loading, setLoading] = useState<boolean>(false)    //transaction pending
  const [txSuccess, setTxSuccess] = useState<boolean>(false)  //transaction success
  const [txFailed, setTxFailed] = useState<boolean>(false)    //transaction failed
  const [txHash, setTxHash] = useState<string>("")
  const [farmInfo, setFarmInfo] = useState<any>([])         //farminfo
  const { connected, contract, getBalance, showBlink, setShowBlink } = useAppContext()

  const [startFarming, setStartFarming] = useState<any>({
    farmer: "Loading...",
    farmingID: "Loading...",
    startDay: "Loading...",
    farmingPower: "Loading...",
  }) // event

  const handleStartFarming = async () => {
    if (2 > 1) {
      setShowBlink(true)
      setTimeout(() => {
        setShowBlink(false)
      }, 1000)
    } else {
      try {
        setLoading(true)
        let startTx = await contract.startFarming("100000000")
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
        console.log("stakeTx :>> ", startTx)
        let txReceipt = await startTx.wait()
        setTxHash(txReceipt.events[0].transactionHash)
        setTxSuccess(true)
        setTxFailed(false)
      } catch (err: any) {
        console.log("Transaction Failed!", (err.reason))
        setLoading(false)
        setTxSuccess(false)
        setTxFailed(true)
      } finally {
        setLoading(false)
      }
    }
  }

  const getFarmInfo = async () => {
    const arrayVal = await contract.getMyFarm()
    const farmInfo = {
      farmingID: arrayVal[0].toString(),
      lockedAmount: arrayVal[1].toString(),
      startDay: arrayVal[2].toString(),
      farmingPower: arrayVal[3].toString(),
      difficulty: arrayVal[4].toString(),
      completedLevels: arrayVal[5].toString(),
      deposit: arrayVal[6].toString(),
    }
    // console.log("FARM_INFO=========>", farmInfo)
    setFarmInfo(farmInfo)
  }

  const getDay = async () => {
    const currentDay = await contract.getDay()
    // console.log("currentDay :>> ", currentDay)
  }

  useEffect(() => {
    if (connected) {
      setInterval(() => {
        getDay()
        getFarmInfo()
      }, 3000)
    }
  }, [connected])

  return (
    <div className="w-[863px] h-[426px] px-[45px] py-[27px] rounded-[10px] text-center bg-[#127FBCE6] fadein">
      <h2 className="mb-[62px] text-[40px] font-bold uppercase">New Game</h2>
      <div className="flex justify-between mb-8">
        {/* Enter your deposit (PIT) */}
        <div className="flex flex-col items-center gap-[13px]">
          <h3 className="text-xl leading-[25px]">Enter your<br /> deposit (PIT)</h3>
          <input
            className={`${showBlink ? "blink" : ""} w-[250px] h-[50px] px-[25px] border border-[#DAC94C] rounded text-right text-xl font-bold text-black`}
            id="deposit"
            name="deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          <p className="text-[13px]">Min. amount 1 PIT</p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-7 text-[#DAC94C]">
          <h3 className="text-xl font-bold">1st level</h3>
          <Image src="/images/arrow.svg" width={139} height={36} alt="arrow" />
          <p className="text-xl leading-[25px]">30 days<br /> runtime</p>
        </div>

        {/* Estimatedearnings (PIT) */}
        <div className="flex flex-col items-center gap-[13px]">
          <h3 className="text-xl leading-[25px]">Estimated<br /> earnings (PIT)</h3>
          <input
            className="w-[250px] h-[50px] px-[25px] border border-[#DAC94C] rounded text-right text-xl font-bold bg-[#DAC94C9E]"
            id="deposit"
            name="deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={handleStartFarming}>Start Farming</Button>
    </div>
  )
}

export default NewGame
