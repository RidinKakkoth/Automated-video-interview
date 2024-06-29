import {  useState } from 'react'
import images from '../../assets/images'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = ({setShowLogin}) => {


    const[menu,setMenu]=useState("home")



  return (
    <div  className='navbar py-5 px-0 flex justify-between items-center'>
       <Link to='/'> <img src={images.logo} alt="logo" className="logo w-[150px]" /></Link>
        <ul id='navbar-menu'  className=" flex list-none gap-[20px] text-bluegrey text-[18px]">
            <Link to='/' onClick={()=>{setMenu("home")}} className={menu=="home"?"active":""}>home</Link>
            <a href='#app-download' onClick={()=>{setMenu("mobile-app")}} className={menu=="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu=="contact-us"?"active":""}>contact-us</a>
        </ul>
        <div id='navbar-right' className=" flex items-center gap-10">
            
            <button onClick={()=>setShowLogin(true)} className='text-[16px] text-bluegrey border border-solid border-prime rounded-full px-[30px] py-[10px] cursor-pointer hover:bg-[#ede6f3
            ]'>signin</button>
        </div>
    </div>
  )
}

export default Navbar