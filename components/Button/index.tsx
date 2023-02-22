const Button = ({ 
  onClick,
  children
}: {
  onClick?: React.MouseEventHandler
  children: string | React.ReactNode
}) => {
  return (
    <button className="w-[204px] h-[62px] rounded-[20px] text-xl font-bold text-[#515151] bg-[#DAC94C] hover:bg-[#C1AE23] active:bg-[#9A8F3A] shadow-[0_4px_4px_rgba(0,0,0,0.25)] duration-300" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
