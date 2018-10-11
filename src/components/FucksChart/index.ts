import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { FuckHistoryElement } from "@/lib/types/fucks";
import { Line } from "vue-chartjs";

@Component
export default class FucksChart extends mixins(Line) {
    @Prop({ default: () => [] }) private fucksHistoryData!: FuckHistoryElement[];
    @Prop({ default: 0 }) private currentFucksGiven!: number;
    @Prop({ default: true }) private loading!: boolean;

    private displayChart() {
        if (this.loading) { return; }
        const formattedData = this.fucksHistoryData && this.fucksHistoryData.length > 0 ? {
            labels: this.fucksHistoryData.map((element, index) => {
                if (index === 0) { return "Beginning of Time"; }
                return element.timeframe;
            }).concat(["Now"]),

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
