import { Component, Prop, Vue, Model } from "vue-property-decorator";
import schedule from "node-schedule";
import _ from "lodash";
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
    private extraFucksGiven: number = 0;
    private title: string = "How many fucks does Shivani give today?";

    @fucksModule.State private fucksGiven!: number;
    @fucksModule.State private fucksHistory!: FuckHistoryElement[];
    @fucksModule.State private fucksGivenLoading!: boolean;
    @fucksModule.State private fucksHistoryLoading!: boolean;
    @fucksModule.State private errorMessage!: string;

    @fucksModule.Action(FUCKS_ACTIONS.GET_MOST_RECENT_FUCKS) private getMostRecentFuck!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.GET_RECENT_FUCKS_HISTORY) private getRecentFuckHistory!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.CLEAR_ALL_FUCKS) private clearAllFucks!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.ADD_DATA_TO_FUCKS_HISTORY) private addDataToFuckHistory!: () => void;
    @fucksModule.Action(FUCKS_ACTIONS.UPDATE_MOST_RECENT_FUCKS)
    private updateMostRecentFuck!: (payload: object) => void;

    private onUpdateClick = _.debounce(() => {
        this.$modal.show("update-fucks");
    });

    private onRefreshClick = _.debounce(() => {
        this.getMostRecentData();
    }, 500);

    private onSubmitClick() {
        if (this.extraFucksGiven > 0) {
            this.updateMostRecentFuck({ amount: Number(this.extraFucksGiven) });
        }
        this.$modal.hide("update-fucks");
    }

    private getMostRecentData() {
        this.getMostRecentFuck();
        this.getRecentFuckHistory();
    }

    private mounted() {
        this.getMostRecentData();
        setInterval(this.getMostRecentData, 1000 * 60 * 5);
    }

    private onClearClick() {
        this.$modal.show("dialog", {
            title: "Clear All Fucks",
            text: "Are you sure to clear all Shivani's fucks?",
            buttons: [
                {
                    title: "Fuck no",
                    default: true,
                },
                {
                    title: "Fuck my fucks",
                    handler: () => {
                        this.clearAllFucks();
                        this.$modal.hide("dialog");
                    },
                },
            ],
        });
    }

}
