import axios from 'axios'
import { UserSignupType } from '../Types/UserTypes';
import { handleAxiosErrors } from './ErrorHandling'
import { axiosClient } from './initialise';


export function login(userLoginData: {user: {email: string, password: string}}) {
    return axiosClient.post(`${process.env.REACT_APP_API_SERVER}/sessions`,
                userLoginData,
                {'withCredentials': true}
    ).then((response) => {

        console.log("LOGGED IN")
        console.log(response)

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
    return axiosClient.get(`${process.env.REACT_APP_API_SERVER}/check_logged_in`,
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
    return axiosClient.delete(`${process.env.REACT_APP_API_SERVER}/session`,
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
    return axiosClient.post(`${process.env.REACT_APP_API_SERVER}/users`,
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