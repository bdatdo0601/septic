import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FucksCounter extends Vue {
    @Prop(Number) private counter!: number;
    @Prop(Boolean) private loading!: boolean;
}
