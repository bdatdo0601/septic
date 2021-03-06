import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    @Prop(String) private message!: string;
    @Prop(String) private msg!: string;
}
