import {
  NURSE_LOADING,
  GET_NURSES_DATA,
  GET_NURSE_DATA,
  SUBMIT_REVIEW,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_ERROR,
  GET_REVIEW,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_ERROR
} from "../actions/NurseActions";

const initialState = {
  nurseLoading:true,
  submittingReview: false,
  reviewLoading: true
};
  
const NurseReducer = function(state = initialState, action) {
  switch (action.type) {
    case NURSE_LOADING:{
      return{
        ...state,
        nurseLoading:true
      }
    }
    case GET_NURSES_DATA:{
      return{
        ...state,
        NurseList: {...action.payload},
        nurseLoading:false,
      }
    }
    case GET_NURSE_DATA:{
      return{
        ...state,
        NurseData: {...action.payload},
        nurseLoading:false,
      }
    }
    case SUBMIT_REVIEW: {
      return{
        ...state,
        submittingReview: true
      }
    }
    case SUBMIT_REVIEW_SUCCESS: {
      return{
        ...state,
        submittingReview: false
      }
    }
    case SUBMIT_REVIEW_ERROR: {
      return{
        ...state,
        submittingReview: false,
        error: action.payload
      }
    }
    case GET_REVIEW: {
      return{
        ...state,
        reviewLoading: true
      }
    }
    case GET_REVIEW_SUCCESS: {
      return{
        ...state,
        NurseReviews: {...action.payload},
        reviewLoading: false
      }
    }
    case GET_REVIEW_ERROR: {
      return{
        ...state,
        reviewLoading: false,
        error: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
  
export default NurseReducer;