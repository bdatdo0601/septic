import axios from "axios";
import { FuckHistoryElement } from "@/lib/types/fucks";

export interface CurrentFucksGivenResponse {
    result: {
        amount: number,
    };
    ok: boolean;
}

export interface FuckHistoryResponse {
    result: {
        data: FuckHistoryElement[],
    };
    ok: boolean;
}

// tslint:disable-next-line:max-line-length
const JSONSTORE_URL = `https://www.jsonstore.io/${process.env.VUE_APP_JSON_STORE_KEY || "41d64a309ce2822eab6c2311dd679722d33417490c48177d869307f29ccd474c"}`;

const CURRENT_FUCKS_GIVEN_KEY = "currentFucksGiven";
const FUCK_GIVEN_HISTORY_KEY = "fucksHistory";

const configOptions = {
    headers: {
        "Content-type": "application/json",
    },
};

const initCurrentFucks = async () => {
    return await axios.post<CurrentFucksGivenResponse>(`${JSONSTORE_URL}/${CURRENT_FUCKS_GIVEN_KEY}`, {
        amount: 0,
    }, configOptions);
};

const getCurrentFucks = async () => {
    const response = await axios.get<CurrentFucksGivenResponse>(
        `${JSONSTORE_URL}/${CURRENT_FUCKS_GIVEN_KEY}`, configOptions);
    return response.data.result ? response.data.result.amount : 0;
};

const updateCurrentFucks = async (newFucksGivenAmount: number) => {
    await axios.put<CurrentFucksGivenResponse>(`${JSONSTORE_URL}/${CURRENT_FUCKS_GIVEN_KEY}`, {
        amount: newFucksGivenAmount,
    }, configOptions);
    return await getCurrentFucks();
};

const initFuckGivenHistory = async () => {
    return await axios.post<FuckHistoryResponse>(`${JSONSTORE_URL}/${FUCK_GIVEN_HISTORY_KEY}`, {
        data: [],
    }, configOptions);
};

const getFuckGivenHistory = async () => {
    const response = await axios.get<FuckHistoryResponse>(`${JSONSTORE_URL}/${FUCK_GIVEN_HISTORY_KEY}`, configOptions);
    return response.data.result ? response.data.result.data : [];
};

const addNewFuckGivenData = async (data: FuckHistoryElement) => {
    const fuckGivenData = await getFuckGivenHistory();
    const updatedHistory = fuckGivenData ? [...fuckGivenData, data] : [data];
    await axios.put<FuckHistoryResponse>(`${JSONSTORE_URL}/${FUCK_GIVEN_HISTORY_KEY}`, {
        data: updatedHistory,
    }, configOptions);
    return await getFuckGivenHistory();
};

export default ({
    initCurrentFucks,
    initFuckGivenHistory,
    getCurrentFucks,
    getFuckGivenHistory,
    updateCurrentFucks,
    addNewFuckGivenData,
});
