import axios from "axios";
import {usersDataType} from "../redux/app-reducer";

const instanceAPI = {
    baseUrl: "http://localhost:3001/users",
}

export const api = {
    getUsers(name: string) {
        return axios.get(`${instanceAPI.baseUrl}?q=${name}`)
            .then(response => {
                return response
            })
            .catch(error => {
                return console.log(error);
            })
    },

    deleteUser(id: number) {
        return axios.delete(`${instanceAPI.baseUrl}/${id}`)
            .then(response => {
                return response
            })
            .catch(error => {
                return console.log(error);
            })
    },

    addedUser(userData: usersDataType) {
        debugger
        return axios.post(`${instanceAPI.baseUrl}`, {
            name: userData.name,
            age: Number(userData.age),
            urlImg: userData.urlImg,
            work: userData.work
        })
            .then(response => {
                return response
            })
            .catch(error => {
                return console.log(error);
            })
    },
}
