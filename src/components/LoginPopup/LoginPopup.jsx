import { useState } from "react"
import images from "../../assets/images"

const LoginPopup = ({setShowLogin}) => {

    const[currentState,setCurrentState]=useState("Login")

  return (
    <div className="absolute z-10 bg-[rgba(0,0,0,0.56)] w-full h-full grid  ">
        <form className="flex flex-col place-self-center w-[max(23vw,330px)] bg-white text-[#808080] text-[14px]  gap-[25px] py-5 px-[30px] rounded-lg animate-[fadeIn_0.5s] " >
            <div className="flex justify-between items-center text-black ">
                <h2 className="font-medium text-2xl">{currentState}</h2>
                <img className="cursor-pointer w-4" onClick={()=>setShowLogin(false)} src={images.cross} alt="" />
            </div>
            <div className="flex flex-col gap-5 ">
                {currentState==="Login"?<></>:
                <input className="boder border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-md " type="text" placeholder="Your name"  required />}
                
                <input className="boder border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-md " type="email" placeholder="Your email"  required />
                <input className="boder border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-md " type="password" placeholder="Password"  required />
            </div>
            <button className="p-[10px] rounded-md text-white bg-prime text-[15px] ">{currentState==="Sign Up"?"Create account":"Login" }</button>
            <div className="flex items-start gap-2 mt-[-15px]">
                <input className="mt-[5px] boder border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-md " type="checkbox" required />
                <p>By continuing, i agree to the Terms of Service and Privacy Policy</p>
            </div>
            {currentState==="Login"?<p>Create a new account? <span className="cursor-pointer text-prime font-[500] " onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account <span className="cursor-pointer text-prime font-[500] " onClick={()=>setCurrentState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup