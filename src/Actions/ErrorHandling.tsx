
export function handleAxiosErrors (error: any) {
    console.log(`Error ${error.response.status} while connecting to API with AXIOS`)
    console.log(error.response)
    console.log(error.message)

    var msgs = []

    switch(error.response.status) {
        case 504: // Connection timeout
            msgs.push("Can't connect to backend services.")
            break;
        case 404: // Page not found
            msgs.push(`Required path "${error.response.responseURL}" does not exist.`)
            break;
        case 500: // Server error
            msgs.push(`Problem with backend services.`)
            break;
        case 401: // No access
            if (error.response.data.messages) {
                msgs  = error.response.data.messages
            } else {
                msgs.push(`You have no access to this resource.`)
            }
            break;
        default:
            alert(`Handling http error ${error.response.status} not implemented!`)
    }

    const to_return = {
        status: error.response.status,
        data: {
            messages: msgs
        }
    }
    return to_return
}