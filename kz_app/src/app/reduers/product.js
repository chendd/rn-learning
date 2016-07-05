/**
 * Created by cauchywei on 16/5/1.
 */

import {
    GET_CATEGORY_BY_CAT_ID,
    GET_COMMODITY_BY_CAT_ID,
    GET_COMMODITY_DETAIL_BY_COM_ID
} from '../service/contract/product'

const initCategoryState = {
    category: null
}

export function category(state = initCategoryState, action) {
    switch (action.type) {
        case GET_CATEGORY_BY_CAT_ID:
            return {...state, category: action.data}
        default:
            return state
    }
}

const initCommodityState = {
    commodities: []
}

export function commodity(state = initCommodityState, action) {
    switch (action.type) {
        case GET_COMMODITY_BY_CAT_ID:
            return {...state, commodities: action.data}
        default:
            return state
    }
}


const initCommodityDetailState = {
    detail: null,
    attributePickerDataSource: null,
    attributeDependencyTree: null
}


export function commodityDetail(state = initCommodityDetailState, action) {
    switch (action.type) {
        case GET_COMMODITY_DETAIL_BY_COM_ID:


            const detail = action.data;


            return {...state, detail}
        default:
            return state
    }
}


