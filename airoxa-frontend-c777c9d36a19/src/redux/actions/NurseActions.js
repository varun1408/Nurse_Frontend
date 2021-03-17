import nurseService from "../../services/nurseService";

export const NURSE_LOADING = "NURSE_LOADING";
export const GET_NURSES_DATA = "GET_NURSES_DATA";
export const GET_NURSE_DATA = "GET_NURSE_DATA";
export const SUBMIT_REVIEW = "SUBMIT_REVIEW";
export const SUBMIT_REVIEW_SUCCESS = "SUBMIT_REVIEW_SUCCESS";
export const SUBMIT_REVIEW_ERROR = "SUBMIT_REVIEW_ERROR";
export const GET_REVIEW = "GET_REVIEW";
export const GET_REVIEW_SUCCESS = "GET_REVIEW_SUCCESS";
export const GET_REVIEW_ERROR = "GET_REVIEW_ERROR";

export function getNurses(params){
  return dispatch =>{
    dispatch({
      type: NURSE_LOADING
    });
    
    nurseService.getNurses(params)
    .then((resp)=>{
      dispatch({
        type:GET_NURSES_DATA,
        payload:resp
      });
    })
  }
}

export function getNurse(params){
  return dispatch =>{
    dispatch({
      type: NURSE_LOADING
    });
    
    nurseService.getNurse(params)
    .then((resp)=>{
      dispatch({
        type:GET_NURSE_DATA,
        payload:resp
      });
    })
  }
}

export function getReviews(params){
  return dispatch =>{
    dispatch({
      type: GET_REVIEW
    });
    
    nurseService.getReviews(params)
    .then((resp)=>{
      dispatch({
        type:GET_REVIEW_SUCCESS,
        payload:resp
      });
    })
    .catch((err)=>{
      dispatch({
        type:GET_REVIEW_ERROR,
        payload: err.response
      })
    })
  }
}

export function addReview(nurseUsername, reviewData){
  return dispatch => {
    dispatch({
      type: SUBMIT_REVIEW
    });

    return nurseService.addReview(nurseUsername, reviewData)
    .then((resp)=>{
      dispatch({
        type:SUBMIT_REVIEW_SUCCESS,
        payload:resp
      });
    })
    .catch((err)=>{
      dispatch({
        type:SUBMIT_REVIEW_ERROR,
        payload: err.response
      })
    })
  }
}