import axiosInstanceWithInterceptor from "./axios";

const userAxiosInstance=axiosInstanceWithInterceptor()

export const login=async()=>{
    try {
        const{data}=await userAxiosInstance.post('api/user/login')
        return data
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
          }
    }
}

export const fetchList=async()=>{
    try {
      const{data}=await userAxiosInstance.get('api/interview/interview-list')
      return data
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }
export const fetchInterviewDetails=async(id)=>{
    try {
      const{data}=await userAxiosInstance.get(`api/interview/interview-list/${id}`)
      return data
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }
export const submitAnswers=async(formData)=>{
    try {
      
      const{data}=await userAxiosInstance.post(`api/interview/submit`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      return data
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  

