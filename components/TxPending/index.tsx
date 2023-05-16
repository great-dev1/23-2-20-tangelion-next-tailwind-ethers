import Image from "next/image";

const TxPending = ({ title }: { title: string }) => {
  return (
    <div className="fadein flex flex-col items-center gap-1.5 md:gap-4 w-[168px] md:w-[400px] h-[78px] md:h-[180px] pt-[14px] md:pt-[50px] rounded-[10px] text-center bg-[#127FBCE6]">
      <h3 className="text-xs md:text-xl font-bold">{title}</h3>
      <Image
        className="rotate w-[25px] md:w-[50px] h-auto"
        src="/images/loading.svg"
        width={50}
        height={50}
        alt="loading"
      />
    </div>
  );
};

export default TxPending;
