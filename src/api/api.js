import axios from "axios";

export const api = {
    getUsers() {
        return axios.get(`http://localhost:3001/users`)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })

    }
}
