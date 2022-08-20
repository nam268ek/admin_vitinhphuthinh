import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../components/redux/store/store";

const persistor = persistStore(store);

export { persistor, PersistGate, store };
