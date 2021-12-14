import axios from 'axios'
import { UserSignupType } from '../Types/UserTypes';
import { handleAxiosErrors } from './ErrorHandling'


export function login(userLoginData: {user: {email: string, password: string}}) {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/sessions`,
                userLoginData,
                {'withCredentials': false}
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
    return axios.get(`${process.env.REACT_APP_API_SERVER}/check_logged_in`,
        {'withCredentials': false}
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
    return axios.delete(`${process.env.REACT_APP_API_SERVER}/session`,
        {'withCredentials': false}
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
    return axios.post(`${process.env.REACT_APP_API_SERVER}/users`,
        {user: newUserData},
        {'withCredentials': false}
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