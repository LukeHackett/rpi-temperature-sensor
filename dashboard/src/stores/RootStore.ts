import LocationStore from './LocationStore';
import ReadingStore from './ReadingStore';

class RootStore {
    public readonly locationStore: LocationStore;
    public readonly readingStore: ReadingStore;

    constructor() {
        this.locationStore = new LocationStore(this);
        this.readingStore = new ReadingStore(this);
    }
}

export default RootStore;