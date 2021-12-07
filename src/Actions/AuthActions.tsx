import axios from 'axios'
import { ErrorType } from '../Types/ErrorTypes'
import { UserType } from '../Types/UserTypes'


export function login(userLoginData: {user: {email: string, password: string}}) {
    return axios.post("/api/sessions",
                userLoginData,
                {'withCredentials': true}
    ).then((response) => {
        return response
    }).catch((error) => {
        return error?.response
    })
}


export function checkLoggedIn() {
    return axios.get("/api/check_logged_in",
        {'withCredentials': true}
    ).then((response) => {
        return response
    }).catch((error) => {
        return error?.response
    })
}


export function logout() {
    return axios.delete("/api/session",
        {'withCredentials': true}
    ).then((response) => {
        return response
    }).catch((error) => {
        return error?.response
    })
}