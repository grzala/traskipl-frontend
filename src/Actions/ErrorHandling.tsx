
export function handleAxiosErrors (error: any) {
    console.log(`Error ${error.response.status} while connecting to API with AXIOS`)
    console.log(error.response)
    console.log(error.message)

    var msg = null

    switch(error.response.status) {
        case 504: // Connection timeout
            msg =  "Can't connect to backend services."
            break;
        case 404: // Page not found
            msg = `Required path "${error.response.responseURL}" does not exist.`
            break;
        case 500: // Page not found
            msg = `Problem with backend services.`
            break;
        default:
            alert(`Handling http error ${error.response.status} not implemented!`)
    }

    const to_return = {
        status: error.response.status,
        data: {
            messages: [
                msg
            ]
        }
    }
    return to_return
}