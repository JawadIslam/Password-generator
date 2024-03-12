import { useCallback, useState, useEffect, useRef, useLayoutEffect } from "react";
import lock from './assets/lock.png'
export default function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setcharAllowed] = useState(true);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
 

 
  
  const passwordRef=useRef(null)
  const passWordGenarator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop";
    if (numberAllowed) {
      str += "012345678";
    }
    if (charAllowed) {
      str += "!@#$%^&*()";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passWordGenarator();
  }, [length, numberAllowed, charAllowed, passWordGenarator]);


  const copyToTheClipBoard= useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  },[password])

  return (

    <div className="flex  select-none flex-col justify-center md:h-lvh h-50vh  items-center font-poppins">

      <div className=" flex border-solid justify-center   items-center flex-col border-[1px] md:m-0 m-4 rounded-md border-gray-300 md:w-[100vh] w-[45vh]  md:h-[90vh] h-[70vh] px-0 py-0 shadow-md bg-[#fafaf9]">
       <img className="w-[90px] h-[110px] mb-4 md:mt-0" src={lock} alt="" />
        <div className="text-2xl font-bold my-2 font-poppins mb-4 md:mb-0 text-sky-500">
          Password Generator
        </div>

       <div className="flex mb-4 md:mb-0">
          <input
            type="text"
            value={password}
            className="mt-1 block md:w-[30vw] w-[60vw] px-3 py-2 bg-white border border-slate-300 rounded-l-lg text-xl shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 
   
    "
      ref={passwordRef}
      
      />
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-r-lg" onClick={copyToTheClipBoard}>Copy</button>
     </div>
    
          <input
            type="range"
            value={length}
            min={6}
            max={40}
            onChange={(e) => {
              setLength(e.target.value);
              
            }}
            className=" w-[300px] md:w-[340px] h-2 my-4  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-sky-700"
          />
          <lebel className="text-gray-600 m-4 md:m-0">Length:{length}</lebel>
        

        
       

          <div className="flex px-4 py-4">
            <div className="px-2">
            <input
              type="checkbox"
              cursor="pointer"
              className="  appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent "
              value="setInput"
              defaultChecked={charAllowed}
              id="charecterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />

            <label className="text-neutral-500 p-2" htmlFor="charecterInput">
              Charecter Input
            </label>
            </div>
       
 <div className="px-2">
          <input
            type="checkbox"
            cursor="pointer"
            className=" appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent "
            id="numberInput" 
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="text-neutral-500 p-2">Numbers</label>
          </div>
          </div>
          <h1 className="text-gray-400  md:text-[0.6rem] mt-8 md:mt-0 text-[0.7rem] ">Devloped by Jawad</h1>
</div>

          </div>
  );
}
