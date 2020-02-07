import axios from 'axios';

const API_URL = "http://localhost:3001"

function healthCheck(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.get(API_URL + "/ht", {headers: {"accept": "application/json"}}).then(({data}) => {
            resolve(data.DatabaseBackend === "working")
        }).catch((e) => reject(e))
    })
}

export const Calculator = {
    healthCheck: healthCheck
}