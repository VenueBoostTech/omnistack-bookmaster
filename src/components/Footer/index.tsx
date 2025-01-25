import { useState } from "react"

import { useEffect } from "react"

const Footer = () => {
  const [year, setYear] = useState("")
  
  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])  
  
    return (
      <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm py-4">
        <div className="text-center text-sm text-muted-foreground">
          © {year} BookMaster. All rights reserved.
        </div>
      </footer>
    )
  }


  export default Footer;