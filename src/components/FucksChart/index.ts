import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { FuckHistoryElement } from "@/lib/types/fucks";
import { Line } from "vue-chartjs";

@Component
export default class FucksChart extends mixins(Line) {
    @Prop({ default: () => [] }) private fucksHistoryData!: FuckHistoryElement[];
    public mounted() {
        const formattedData = this.fucksHistoryData && this.fucksHistoryData.length > 0 ?
            this.fucksHistoryData.map((element) => element.amount) : [0];
        this.renderChart({
            labels: ["Beginning of time", "Now"],
            datasets: [{
                label: "Fucks Given",
                borderColor: "red",
                fill: false,
                data: formattedData,
            }],
        }, { responsive: true });
    }
}
