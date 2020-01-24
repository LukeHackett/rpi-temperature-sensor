import {computed} from 'mobx';
import BaseStore from './BaseStore';
import ChartLine from '../model/ChartLine';
import randomColor from 'randomcolor';

class ReadingStore extends BaseStore {

    @computed
    public get readings() {
        return [
            {
              timestamp: 'Page A', bedroom: 4000, lounge: 2400, london: 2400,
            },
            {
              timestamp: 'Page B', bedroom: 3000, lounge: 1398, london: 2210,
            },
            {
              timestamp: 'Page C', bedroom: 2000, lounge: 9800, london: 2290,
            },
            {
              timestamp: 'Page D', bedroom: 2780, lounge: 3908, london: 2000,
            },
            {
              timestamp: 'Page E', bedroom: 1890, lounge: 4800, london: 2181,
            },
            {
              timestamp: 'Page F', bedroom: 2390, lounge: 3800, london: 2500,
            },
            {
              timestamp: 'Page G', bedroom: 3490, lounge: 4300, london: 2100,
            },
        ];
    }

    @computed
    public get lineType(): ChartLine[] {
        return this.rootStore.locationStore.checked
            .map(location => new ChartLine(location.name, randomColor()));
    }

}

export default ReadingStore;