import axios from "axios";
import { FuckHistoryElement } from "@/lib/types/fucks";

export interface FucksDataResponse {
    currentFucksGiven: {
        amount: number,
    };
    fucksHistory: {
        data: FuckHistoryElement[],
    };
}

export interface FucksDataInput {
    currentFucksGiven?: {
        amount?: number,
    };
    fucksHistory?: {
        data?: FuckHistoryElement[],
    };
}

// tslint:disable-next-line:max-line-length
const MYJSON_URL = `https://api.myjson.com/bins/${process.env.VUE_APP_MY_JSON_KEY || "9qmh8"}`;


const configOptions = {
    headers: {
        "Content-type": "application/json",
    },
};

const getFucksData = async () => {
    const response = await axios.get<FucksDataResponse>(MYJSON_URL, configOptions);
    return response.data;
};

const setFucksData = async (input: FucksDataInput) => {
    const response = await axios.put<FucksDataResponse>(MYJSON_URL, input, configOptions);
    return response.data;
};

const initCurrentFucks = async () => {
    const oldData = await getFucksData();
    const input: FucksDataInput = {
        ...oldData,
        currentFucksGiven: {
            amount: 0,
        },
    };
    const newData = await setFucksData(input);
    return newData.currentFucksGiven.amount;
};

const getCurrentFucks = async () => {
    const data = await getFucksData();
    return data.currentFucksGiven.amount;
};

const updateCurrentFucks = async (newFucksGivenAmount: number) => {
    const oldData = await getFucksData();
    const input: FucksDataInput = {
        ...oldData,
        currentFucksGiven: {
            amount: newFucksGivenAmount,
        },
    };
    const newData = await setFucksData(input);
    return newData.currentFucksGiven.amount;
};

const initFuckGivenHistory = async () => {
    const oldData = await getFucksData();
    const input: FucksDataInput = {
        ...oldData,
        fucksHistory: {
            data: [],
        },
    };
    const newData = await setFucksData(input);
    return newData.fucksHistory.data;
};

const getFuckGivenHistory = async () => {
    const data = await getFucksData();
    return data.fucksHistory.data;
};

const addNewFuckGivenData = async (data: FuckHistoryElement) => {
    const fucksData = await getFucksData();
    const updatedData: FucksDataInput = {
        ...fucksData,
        fucksHistory: {
            data: fucksData.fucksHistory.data ? [...fucksData.fucksHistory.data, data] : [data],
        },
    };
    return await setFucksData(updatedData);
};

export default ({
    initCurrentFucks,
    initFuckGivenHistory,
    getCurrentFucks,
    getFuckGivenHistory,
    updateCurrentFucks,
    addNewFuckGivenData,
});
