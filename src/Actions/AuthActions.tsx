import axios from 'axios'


export function login(userLoginData: {user: {email: string, password: string}}) {
    axios.post("/api/sessions",
                userLoginData,
                {'withCredentials': true}
    ).then((response) => {
        console.log(response)
        // if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        //     this.setState( {
        //         loggedInStatus: "LOGGED_IN",
        //         user: response.data.user
        //     })
        // } else if (!response.data.logged_in &&this.state.loggedInStatus === "LOGGED_IN") {
        //     this.setState({
        //         loggedInStatus: "NOT_LOGGED_IN",
        //         user: {}
        //     })
        // }
    }).catch((error) => {
        console.log("error", error) 
    })
}


export function checkLoggedIn() {
    axios.get("/api/check_logged_in",
        {'withCredentials': true}
    ).then((response) => {
        console.log(response)
        // if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        //     this.setState( {
        //         loggedInStatus: "LOGGED_IN",
        //         user: response.data.user
        //     })
        // } else if (!response.data.logged_in &&this.state.loggedInStatus === "LOGGED_IN") {
        //     this.setState({
        //         loggedInStatus: "NOT_LOGGED_IN",
        //         user: {}
        //     })
        // }
    }).catch((error) => {
        console.log("error", error) 
    })
}