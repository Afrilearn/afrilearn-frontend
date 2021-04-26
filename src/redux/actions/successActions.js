import { GET_SUCCESS, CLEAR_SUCCESS} from './types';

export const returnSuccess = (msg, id = null) => {
    try {       	
        return {
            type: GET_SUCCESS,
            payload:{
                msg,
                id
            }
        }
    } catch (error) {
        console.error(error);
    }    

}

export const clearSuccess = () => {
    try {       	
        return {
            type: CLEAR_SUCCESS            
        }
    } catch (error) {
        console.error(error);
    }    

}