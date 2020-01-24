import RootStore from './RootStore';
import LocationStore from './LocationStore';
import ReadingStore from './ReadingStore';

enum Store {
    LOCATION = 'locationStore',
    READINGS = 'readingStore'
}

// Create an Application Store
const stores = new RootStore();

export {
    stores as default,
    Store,
    LocationStore,
    ReadingStore
}
