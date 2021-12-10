import axios from 'axios'
import { UserSignupType } from '../Types/UserTypes';
import { handleAxiosErrors } from './ErrorHandling'


export function login(userLoginData: {user: {email: string, password: string}}) {
    return axios.post("/api/sessions",
                userLoginData,
                {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }
        
        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


export function checkLoggedIn() {
    return axios.get("/api/check_logged_in",
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


export function logout() {
    return axios.delete("/api/session",
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }
        
        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


export function register(newUserData: UserSignupType) {
    console.log("bruh")
    return axios.post("/api/users",
        {user: newUserData},
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }
        
        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}