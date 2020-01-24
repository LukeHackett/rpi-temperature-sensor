import {observable} from 'mobx';

class ChartLine {

    @observable
    public type: string = "monotone";

    @observable
    public dataKey: string;

    @observable
    public colour: string;

    public constructor(dataKey: string, colour: string) {
        this.dataKey = dataKey;
        this.colour = colour;
    }

}

export default ChartLine;