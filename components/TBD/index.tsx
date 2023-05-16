const TBD = ({ title }: { title: string }) => {
  return (
    <div className="overpass_font w-[212px] md:w-[610px] h-[112px] md:h-[251px] py-[30px] md:py-[27px] text-center text-black bg-[#DAC94C]">
      <h2 className="mb-2 md:mb-14 text-sm md:text-2xl font-bold">{title}</h2>
      <p className="text-xs md:text-xl font-bold">Under Construction...</p>
    </div>
  );
};

export default TBD;
