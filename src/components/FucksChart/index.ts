import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { FuckHistoryElement } from "@/lib/types/fucks";
import { Line } from "vue-chartjs";
import _ from "lodash";

@Component
export default class FucksChart extends mixins(Line) {
    @Prop({ default: () => [] }) private fucksHistoryData!: FuckHistoryElement[];
    @Prop({ default: 0 }) private currentFucksGiven!: number;
    @Prop({ default: true }) private loading!: boolean;

    private groupData(fucksHistoryData: FuckHistoryElement[]) {
        if (!this.fucksHistoryData) { return []; }
        const groupedFucksHistoryData: FuckHistoryElement[] = [];
        fucksHistoryData.forEach((element: FuckHistoryElement) => {
            const existedElementIndex = groupedFucksHistoryData.findIndex(
                (value: FuckHistoryElement) => element.timeframe === value.timeframe,
            );
            if (existedElementIndex === -1) {
                groupedFucksHistoryData.push(element);
            } else {
                groupedFucksHistoryData[existedElementIndex].amount += element.amount;
            }
        });
        return groupedFucksHistoryData;
    }

    private displayChart() {
        if (this.loading) { return; }
        const groupedData = this.groupData(this.fucksHistoryData);
        const formattedData = groupedData.length > 0 ? {
            labels: groupedData.map((element: FuckHistoryElement, index: number) => {
                if (index === 0) { return "Beginning of Time"; }
                return element.timeframe;
            }).concat(["Now"]),
            data: groupedData.map((element: FuckHistoryElement) => element.amount).concat([this.currentFucksGiven]),
        } : {
                labels: ["Beginning of Time", "Now"],
                data: [0, this.currentFucksGiven],
            };
        this.renderChart({
            labels: formattedData.labels,
            datasets: [{
                label: "Fucks Given",
                borderColor: "red",
                fill: false,
                data: formattedData.data,
            }],
        }, { responsive: true });

    }

    private mounted() {
        this.displayChart();
    }
    private updated() {
        this.displayChart();
    }
}
