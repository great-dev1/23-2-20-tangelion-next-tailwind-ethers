const WhiteButton = ({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler;
  children: string | React.ReactNode;
}) => {
  return (
    <button
      className={`w-[72px] md:w-[107px] h-8 md:h-[46px] pt-0.5 rounded-[20px] text-xs md:text-xl font-medium text-black bg-white hover:bg-[#D9D9D9E6] active:bg-[#95948E] shadow-[0_4px_4px_rgba(0,0,0,0.25)] duration-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default WhiteButton;
