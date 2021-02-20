import { gigService } from "../../services/gigService.js";
import { cloudinaryService } from "../../services/cloudinaryService.js";

export function loadGigs(filterBy ={}) {
    return async (dispatch) => {
    // return async (dispatch, getState) => {
        // const { filterBy } = getState().gigModule
        const gigs = await gigService.query(filterBy)
        const action = {
            type: 'SET_GIGS',
            gigs
        }
        dispatch(action)
    }
}

export function loadGig(gigId) {
    return gigService.getById(gigId)
}
export async function getGigs(gigIds) {
    const prmGigs = gigIds.map(gigId => loadGig(gigId))
    const gigs = await Promise.all(prmGigs)
    return gigs
}

export function removeGig(gigId) {
    return async (dispatch) => {
        await gigService.deleteGig(gigId)
        const action = {
            type: 'REMOVE_GIG',
            gigId
        }
        dispatch(action)

    }
}

export function addGig(gig) {
    return async (dispatch) => {
        const savedGig = await gigService.save(gig)
        const action = {
            type: 'ADD_GIG',
            savedGig
        }
        dispatch(action)

    }
}
export function updateGig(gig) {
    return async (dispatch) => {
        const savedGig = await gigService.save(gig)
        const action = {
            type: 'SAVE_GIG',
            savedGig
        }
        dispatch(action)

    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'SET_FILTER',
            filterBy
        }
        dispatch(action)
    }
}