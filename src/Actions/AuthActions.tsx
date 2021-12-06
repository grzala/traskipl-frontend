import axios from 'axios'

axios.get("http://localhost:3000/logged_in",
        {'withCredentials': true}
    ).then((response) => {
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