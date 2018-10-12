import { Module } from "vuex";
import _ from "lodash";
import { RootState, FucksState } from "@/store/types";
import MyJSONAPI from "@/lib/myJSONAPI";

export const FUCKS_ACTIONS = {
    GET_MOST_RECENT_FUCKS: "getMostRecentFucks",
    UPDATE_MOST_RECENT_FUCKS: "updateMostRecentFucks",
    GET_RECENT_FUCKS_HISTORY: "getRecentFucksHistory",
    ADD_DATA_TO_FUCKS_HISTORY: "addDataToFucksHistory",
    CLEAR_ALL_FUCKS: "clearAllFucks",
};

export const FUCKS_MUTATION = {
    ON_RECENT_FUCKS_REQUEST_SUCCESS: "onRecentFucksRequestSuccess",
    ON_RECENT_FUCKS_REQUEST_PENDING: "onRecentFucksRequestPending",
    ON_RECENT_FUCKS_REQUEST_FAILURE: "onRecentFuckRequestFailure",
    ON_FUCK_HISTORY_REQUEST_SUCCESS: "onFuckHistoryRequestSuccess",
    ON_FUCK_HISTORY_REQUEST_PENDING: "onFuckHistoryRequestPending",
    ON_FUCK_HISTORY_REQUEST_FAILURE: "onFuckHistoryRequestFailure",
};

const fucksModule: Module<FucksState, RootState> = {
    namespaced: true,
    state: {
        fucksGivenLoading: false,
        fucksGiven: 0,
        fucksHistory: [],
        fucksHistoryLoading: false,
        errorMessage: "",
    },
    mutations: {
        // only for synchronous changes
        [FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_SUCCESS]: (state, payload) => {
            state.fucksGivenLoading = false;
            state.fucksGiven = payload.mostRecentFucksGiven;
        },
        [FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_PENDING]: (state) => {
            // comment
            state.errorMessage = "";
            state.fucksGivenLoading = true;
        },
        [FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_FAILURE]: (state, payload) => {
            // comment
            state.fucksGivenLoading = false;
            state.errorMessage = payload.errorMessage;
        },
        [FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_SUCCESS]: (state, payload) => {
            // comment
            state.fucksHistoryLoading = false;
            state.fucksHistory = payload.fucksHistory;
        },
        [FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_PENDING]: (state) => {
            // comment
            state.errorMessage = "";
            state.fucksHistoryLoading = true;
        },
        [FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_FAILURE]: (state, payload) => {
            // comment
            state.fucksHistoryLoading = false;
            state.errorMessage = payload.errorMessage;
        },
    },
    actions: { // for asynchronous changes
        [FUCKS_ACTIONS.CLEAR_ALL_FUCKS]: async ({ commit }) => {
            try {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_PENDING);
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_PENDING);
                await MyJSONAPI.initCurrentFucks();
                await MyJSONAPI.initFuckGivenHistory();
                setTimeout(() => {
                    commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_SUCCESS, { mostRecentFucksGiven: 0 });
                    commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_SUCCESS, { fucksHistory: [] });
                }, 500);

            } catch (error) {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_FAILURE);
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_FAILURE);
            }
        },
        [FUCKS_ACTIONS.GET_MOST_RECENT_FUCKS]: async ({ commit }) => {
            try {
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_PENDING);
                const mostRecentFucksGiven = await MyJSONAPI.getCurrentFucks();
                setTimeout(() => {
                    commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_SUCCESS, { mostRecentFucksGiven });
                }, 500);
            } catch (error) {
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_FAILURE, { errorMessage: error.message });
            }
        },
        [FUCKS_ACTIONS.UPDATE_MOST_RECENT_FUCKS]: async ({ commit, state }, payload) => {
            // comment
            try {
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_PENDING);
                const newFucksGivenAmount = state.fucksGiven + payload.amount;
                const mostRecentFucksGiven = await MyJSONAPI.updateCurrentFucks(newFucksGivenAmount);
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_SUCCESS, { mostRecentFucksGiven });
            } catch (error) {
                commit(FUCKS_MUTATION.ON_RECENT_FUCKS_REQUEST_FAILURE, { errorMessage: error.message });
            }
        },
        [FUCKS_ACTIONS.GET_RECENT_FUCKS_HISTORY]: async ({ commit }) => {
            // comment
            try {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_PENDING);
                const mostRecentFucksHistory = await MyJSONAPI.getFuckGivenHistory();
                setTimeout(
                    () => {
                        commit(
                            FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_SUCCESS, { fucksHistory: mostRecentFucksHistory },
                        );
                    },
                    500,
                );
            } catch (error) {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_FAILURE, { errorMessage: error.message });
            }
        },
        [FUCKS_ACTIONS.ADD_DATA_TO_FUCKS_HISTORY]: async ({ commit }, payload) => {
            // comment
            try {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_PENDING);
                const mostRecentFucksGiven = await MyJSONAPI.addNewFuckGivenData(payload.data);
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_SUCCESS, { fucksHistory: mostRecentFucksGiven });
            } catch (error) {
                commit(FUCKS_MUTATION.ON_FUCK_HISTORY_REQUEST_FAILURE, { errorMessage: error.message });
            }
        },
    },
};

export default fucksModule;
