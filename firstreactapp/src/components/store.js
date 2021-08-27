import {createStore} from "redux";

import cakereducer from "../reducers/cakereducer";

const store = createStore(cakereducer);

export default store;