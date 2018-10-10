import { Component, Prop, Vue } from "vue-property-decorator";
import FucksCounter from "@/components/FucksCounter/index.vue"; // @ is an alias to /src
import FucksChart from "@/components/FucksChart/index.vue";
import { namespace } from "vuex-class";
import { FUCKS_ACTIONS } from "@/store/fucks";
import { FuckHistoryElement } from "@/lib/types/fucks";

const fucksModule = namespace("fucks");

@Component({
    components: {
        FucksCounter,
        FucksChart,
    },
})
export default class Home extends Vue {
    private title: string = "How many fucks does Shivani given today?";

    @fucksModule.State private fucksGiven!: number;
    @fucksModule.State private fucksHistory!: FuckHistoryElement[];
    @fucksModule.State private fucksGivenLoading!: boolean;
    @fucksModule.State private fucksHistoryLoading!: boolean;
    @fucksModule.State private errorMessage!: string;

    @fucksModule.Action(FUCKS_ACTIONS.GET_MOST_RECENT_FUCKS) private getMostRecentFuck!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.GET_RECENT_FUCKS_HISTORY) private getRecentFuckHistory!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.ADD_DATA_TO_FUCKS_HISTORY) private addDataToFuckHistory!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.UPDATE_MOST_RECENT_FUCKS) private updateMostRecentFuck!: () => void;

}
