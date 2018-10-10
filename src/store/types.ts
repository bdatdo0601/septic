import { FuckHistoryElement } from "@/lib/types/fucks";

export interface RootState {
    version: string;
}

export interface FucksState {
    fucksGivenLoading: boolean;
    fucksGiven: number;
    fucksHistory: FuckHistoryElement[];
    fucksHistoryLoading: boolean;
    errorMessage: string;
}
