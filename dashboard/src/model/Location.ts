import {observable} from 'mobx';

class Location {

    @observable
    public name: string;

    @observable
    public checked: boolean = false;

    public constructor(name: string) {
        this.name = name;
    }

}

export default Location;