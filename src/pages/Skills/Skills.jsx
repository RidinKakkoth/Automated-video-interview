import { useEffect } from "react";
import { fetchList } from "../../config/userEndpoints";
import { useState } from "react";
import { toast } from "react-toastify";
import{useNavigate} from 'react-router-dom'




const Skills = () => {

  const [data,setData]=useState()

  
  useEffect(()=>{
    fetchData()
  },[])

const fetchData = async()=>{
  
  const response = await fetchList()
  
  if(response.success){
    setData(response.data)
  }
  else{
    toast.error(response.message)
  }
  
}

const navigate=useNavigate()

const handleStartClick = (itemId) => {
  navigate(`/interview/${itemId}`);
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-prime font-bold mb-4">Mock Interviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map(item => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl text-secondary font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">Years of Experience: {item.experience}</p>
              <p className="text-gray-600">Created Date: {new Date(item.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleStartClick(item._id)} className="mt-4 bg-prime text-white px-4 py-2 rounded hover:bg-prime2">Start</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
