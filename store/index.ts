import { StoreModel } from "./models";
import { persist, createStore } from "easy-peasy";
import * as service from './services'


const store = createStore<StoreModel>(
    persist({
        ...service.ArticleService,
    }),
    {
        version: 0
    }
)

export default store

