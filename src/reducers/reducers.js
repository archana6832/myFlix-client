import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('Set_Movies reducer reached')
            return action.value;
        default:
            return state;
    }
}

function user(state = null, action) {
    switch (action.type) {
        case SET_USER:
            console.log('Set_User reducer reached')
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
});


export default moviesApp;