import { useState, useCallback, useEffect  } from "react"

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]~`"



    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, numAllowed, charAllowed, setpassword])

useEffect(()=>{
 passwordgenerator()
},[length, numAllowed, charAllowed, passwordgenerator])

const copyToClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
},[password])

  return (
<>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center text-3xl py-6">Password Generator</h1>
      <div className="flex flex-row">
      <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="Password"
      readOnly
      />
<button className="outline-none bg-blue-400 text-white py-0.5 px-3 "
onClick={copyToClipboard}
>
  Copy
</button>
</div>
<div className="flex text-sm gap-6 pt-6">
      <div className="flex items-center gap-x-1">
        <input
        type="range"
        min={8}
        max={100}
        value={length}
        className="cursor-pointer bg-blue-600"
        onChange={(e)=>{
          setlength(e.target.value)
        }}
        />
        <label>length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={numAllowed}
      id="numberInput"
      onChange={()=>{
        setnumAllowed((prev)=>!prev);
      }}
      />
      <label>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={charAllowed}
      id="characterInput"
      onChange={()=>{
        setcharAllowed((prev)=>!prev);
      }}
      />
      <label>Character</label>
      </div>
    </div>
    </div>   
    </>
  )
}
export default App



