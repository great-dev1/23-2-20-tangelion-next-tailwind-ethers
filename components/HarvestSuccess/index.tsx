import { useState, useEffect } from 'react';
import Image from "next/image"
import WhiteButton from "../WhiteButton"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"
import { getPercentage, PitToString } from "@/utils"

const HarvestSuccess = () => {
  const { gameStatus, appData, changeStatus, appDataTemp, eventData } = useAppContext()
  const [percentage, setPercentage] = useState("0.00")

  useEffect(() => {
    if (eventData.payout > 0) {
      const percent = getPercentage((eventData.payout - appDataTemp.deposit) * 100 / appDataTemp.deposit)
      setPercentage(percent)
    }
    else setPercentage("0.00")
  }, [eventData])

  return (
    <div className="fadein w-[600px] p-[26px] pb-12 rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-9 text-2xl font-bold">
        Congratulations!<br />
        You successfully harvested {gameStatus === constants.DEADLINE_1 ? "your full" : "parts of your"} earnings!
      </h3>
      <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
      <p className="flex items-center gap-3 mb-8">
        <span className="text-sm font-medium">{appData.txHash}</span>
        <a href={`https://mumbai.polygonscan.com/tx/${appData.txHash}`} target="_blank" rel="noreferrer">
          <Image src="/images/open-link.svg" width={15} height={15} alt="open link" />
        </a>
      </p>
      <ul className="max-w-[411px] flex flex-col gap-6 mx-auto mb-9">
        <li className="flex justify-between gap-6 text-xl">
          <h4 className="font-medium">Your total earnings</h4>
          <p className="font-bold">{PitToString(eventData.payout)} PIT</p>
        </li>
        <li className="flex justify-between gap-6 text-xl">
          <h4 className="font-medium">Your deposit</h4>
          <p className="font-bold">{appData.deposit} PIT</p>
        </li>
        <li className="flex justify-between gap-6 text-xl">
          <h4 className="font-medium">Earnings percentage</h4>
          <p className="font-bold">{percentage}%</p>
        </li>
      </ul>
      <WhiteButton onClick={() => changeStatus(constants.okay, constants.success)}>OK</WhiteButton>
    </div>
  )
}

export default HarvestSuccess
