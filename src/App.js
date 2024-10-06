import {useState , useCallback, useEffect , useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook

  const passref = useRef(null)

  const passGen =useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(character) str += "!@#$%^&*-_+=[]{}~`"
    for (let i = 1; i <=length ; i++) {
      let char = Math.floor(Math.random()* str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, number ,character,setPassword])

  const copyPassToClipBoard = useCallback(()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
  }, [password])

    useEffect(()=>{
      passGen()
    }, [length,number,character, passGen])
  return (
    <>
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 text-orange-500
     bg-gray-800 text-center my-60 ' >
      <h1 className='text-white text-center mb-3 text-3xl'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 mb-3 rounded-lg'
            placeholder='password'
            readOnly
            ref={passref}
            />
   <button onClick={copyPassToClipBoard} className='hover:font-bold rounded-lg outline-none bg-blue-600 text-white px-2 shrink-0 h-8'>Copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 font-medium text-xl'>
          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1 font-medium text-xl'>
          <input 
          type='checkbox'
          defaultChecked={number}
          id='numberInput'
          onChange={()=>{
                    setNumber((prev)=> !prev)
          }}  
          ></input>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 font-medium text-xl'>
          <input 
          type='checkbox'
          defaultChecked={character}
          id='charInput'
          onChange={()=>{
                    setCharacter((prev)=> !prev)
          }}  
          ></input>
          <label>Characters</label>
        </div>
       </div>
    </div>
    </>
  );
}

export default App;
