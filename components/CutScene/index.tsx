const CutScene = ({ no }: { no: number }) => {
  return (
    <video className="fadein absolute top-[-1px] left-0 w-full h-full" autoPlay muted>
      <source src={`/videos/cutscene-${no}.mp4`} type="video/mp4" />
    </video>
  )
}

export default CutScene
