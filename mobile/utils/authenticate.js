import axios from 'axios'
import { API_URL } from "@env";

export async function signUp(phone,email,password,confirmPassword) {
    const response = await axios.post(API_URL + "auth/sign-up",{
        email: email,
        phone: phone,
        password: password,
        password_confirm: confirmPassword
    })
    const message = response.data.message
    const token = response.data.token;
    const id = response.data.id
    return {message:message, token:token,id:id};
  

}

export async function login(phone, password) {
    const response = await axios.post(API_URL + "auth/sign-in",{
        phone: phone,
        password: password,
    })
    const message = response.data.message
    const token = response.data.token;
    const userInfo = response.data.result["user-info"]
    return {message: message, token: token, id: userInfo.id};

}
export async function forgotPassword(phone,email){
    const response = await axios.post(API_URL + "auth/forgot-password",{
        phone: phone,
        email: email,
    })
    const message = response.data.message
    const sentEmail = response.data.email
    return {message: message, sentEmail: sentEmail};
}