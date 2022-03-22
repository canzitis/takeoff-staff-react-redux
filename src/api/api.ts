import axios from "axios";
import {addedUserType, editUserType} from "../redux/app-reducer";

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

    deleteUser(id: number | null) {
        return axios.delete(`${instanceAPI.baseUrl}/${id}`)
            .then(response => {
                return response
            })
            .catch(error => {
                return console.log(error);
            })
    },

    addedUser(userData: addedUserType) {
        return axios.post(`${instanceAPI.baseUrl}`, {
            name: userData.name,
            age: userData.age,
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

    editUser(userData: editUserType) {
        return axios.put(`${instanceAPI.baseUrl}/${userData.id}`, {
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
