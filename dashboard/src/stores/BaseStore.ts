import RootStore from './RootStore';

abstract class BaseStore {
    protected rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

}

export default BaseStore;