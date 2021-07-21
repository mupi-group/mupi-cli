import {Title, Description, ID} from "@mupi/core";

@Title({
    title: 'gg management',
    subtitle: 'config your gg info here'
})
export default class GgModel {
    @ID()
    @Description('ID')
    id: string;

    @Description('gg name')
    name: string;
}