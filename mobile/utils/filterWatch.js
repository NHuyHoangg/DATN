import axios from 'axios'

export async function signUp(filterProps) {
    const response = await axios.post("https://ctime.hcmut.live/filter",{
        
    })
    const data= response.data
    return {data};
  

}