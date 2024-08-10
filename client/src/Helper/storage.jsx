export const loadState = (stateName) => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (serializedState === null) {
            return undefined;
        }

        const state = JSON.parse(serializedState);
        const oneDayInMillis = 7 * 24 * 60 * 60 * 1000;
        const lastAccessed = new Date(state.lastAccessed).getTime();
        const now = new Date().getTime();

        if (now - lastAccessed > oneDayInMillis) {
            localStorage.removeItem(stateName);
            return undefined;
        }
        return state;
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

export const saveState = (state, stateName) => {
    try {
        const timestampedState = {
            ...state,
            lastAccessed: new Date().toISOString(),
        };
        const serializedState = JSON.stringify(timestampedState);
        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
