import axios from 'axios';
import { GTTopics, GTEquation, Equation } from '../types/calculator';

const API_URL = "https://methapis.qinguan.tk"

function healthCheck(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.get(API_URL + "/ht", { headers: { "accept": "application/json" } }).then(({ data }) => {
            resolve(data.DatabaseBackend === "working")
        }).catch((e) => reject(e))
    })
}

function getTopics(difficulty: "a" | "e"): Promise<GTTopics> {
    return new Promise<GTTopics>((resolve, reject) => {
        axios.get(API_URL + "/api/calculators/getTopics", { params: { difficulty } }).then(({ data }) => {
            resolve(data)
        }).catch((e) => reject(e))
    })
}

function initialize(difficulty: "a" | "e"): Promise<{ health: boolean; topics: GTTopics }> {
    return new Promise<{ health: boolean; topics: GTTopics }>((resolve, reject) => {
        healthCheck().then((health) => {
            if (!health) {
                resolve({health: false, topics: {}})
            } else {
                getTopics(difficulty).then((topics) => {
                    resolve({health: true, topics: topics})
                }).catch((e) => console.error(e))
            }
        }).catch((e) => console.error(e))
    })
}

function getEquation(id: number): Promise<Equation> {
    return new Promise<Equation> ((resolve, reject) => {
        axios.get(API_URL + "/api/calculators/" + id).then(({data}) => {
            resolve(data)
        }).catch((e) => reject(e))
    })
}

function calculateValue(id: number, values: {[key: string]: number}): Promise<string> {
    return new Promise<string> ((resolve, reject) => {
        axios.get(API_URL + "/api/calculators/" + id + "/cv")
    })
}

export const Calculator = {
    healthCheck: healthCheck,
    getTopics: getTopics,
    initialize: initialize,
    getEquation: getEquation
}