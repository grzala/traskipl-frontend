
export function handleAxiosErrors (error: any) {
    // console.log(`Error ${error?.response?.status} while connecting to API with AXIOS`)
    // console.log(error?.response)
    // console.log(error?.message)

    var msgs = []

    if (!error.response)
        throw new Error("Error response is null")

    switch(error?.response?.status) {
        case 504: // Connection timeout
            msgs.push("Can't connect to backend services.")
            break;
        case 404: // Page not found
            msgs.push(`Required path "${error.response.request.responseURL}" does not exist.`)
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
        status: error?.response?.status,
        data: {
            og_message: error?.response?.data,
            messages: msgs
        }
    }

    if (process.env.REACT_APP_DEBUG_MODE === "TRUE") {
        alert(`Error: ${error.response.status}: ${msgs.join(", ")}`)
    }
    return to_return
}