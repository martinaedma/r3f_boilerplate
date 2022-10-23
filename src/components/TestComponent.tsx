import { useState } from "react"

interface TestComponentProps {
  number: number,
  text: string,
  isTrue: boolean
}

export const TestComponent = ():JSX.Element => {
  const [active, setActive] = useState(false)
  return <div 
    // className={`fade-out ${active ? 'fade-in' : ''}`}
    className="fade"
    onClick={() => setActive( prev => !prev)}>
      TEXT HERE
  </div>
}