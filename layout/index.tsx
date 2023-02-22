import Header from "./header"
import Background from "@/components/Background"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
      <Background />
    </>
  )
}

export default Layout
