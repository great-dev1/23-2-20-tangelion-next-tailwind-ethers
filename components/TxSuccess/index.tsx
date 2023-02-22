import Image from "next/image"
import WhiteButton from "../WhiteButton"

const TxSuccess = () => {
  return (
    <div className="flex flex-col items-center w-[600px] h-[240px] p-5 rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-7 text-2xl font-bold">Transaction successful</h3>
      <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
      <p className="flex items-center gap-3 mb-auto">
        <span className="text-sm font-medium">0xbd6133cd3de7e845152f82a44cb19b66bbf0a45970fa41e45ce5eead3253f282</span>
        <a href="/">
          <Image src="/images/open-link.svg" width={15} height={15} alt="open link" />
        </a>
      </p>
      <WhiteButton>OK</WhiteButton>
    </div>
  )
}

export default TxSuccess
