import { useNavigate } from "react-router-dom"
import images from "../../assets/images"
import './Header.css'

const Header = () => {

    const navigate=useNavigate()

  return (
    <div id="header" className=" h-[34vw] my-[20px] mx-auto rounded-lg  bg-cover relative " style={{backgroundImage:`url(${images.header})`}}>
      <div id="header-contents" className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-[fadeIn_3s] ">
        <h2 className="text-2xl font-medium text-[max(4.5vw,22px)] text-white leading-tight">AI automated Interview </h2>
        <p className="text-white text-[1vw]">A skills assessment can help you identify your top skills. Your skills are the things you do well. Workplace skills are skills that help you do your job well.</p>
        <button onClick={()=>{navigate('/skills')}}  className="border-none text-[#747474] font-medium text-[max(1vw,13px)] bg-white px-[2.3vw] py-[1vw] rounded-full ">Test Your Skill</button> 
        {/* rounded-[50px] */}
      </div>
    </div>
  )
}

export default Header