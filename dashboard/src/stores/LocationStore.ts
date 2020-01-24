import {action, observable, runInAction, computed} from 'mobx';
import Location from '../model/Location';
import BaseStore from './BaseStore';

class LocationStore extends BaseStore {
    @observable public locations: Location[] = [];

    @action.bound
    public async fetchLocations() {
        const response: Response = await fetch('/locations.json');

        if (response.status === 200) {
            const body: any = await response.json();

            runInAction(() => {
                this.locations = body.locations?.map((name: string) => new Location(name))
            })            
        }
    }
    
    @action.bound
    public toggleLocation(name: string, checked: boolean) {
        const index: number = this.locations.findIndex(location => location.name === name);
        if (index > -1) {
            this.locations[index].checked = checked;
        }
    }

    @computed
    public get checked() {
        return this.locations.filter(location => location.checked)
    }

}

export default LocationStore;