import {
  INPUT_CHANGE,
  GET_ROLES_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,  
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PASSWORD_CHANGE_SUCCESS
} from '../actions/types';

const initialState = {
  drop: false,
  redirect: false,
  location:'/profile',
  chartSection:'subject',
  isAuthenticated:false,
  role:'',
  activeClass:'',
  fullName:'',
  email:'',
  password:'',
  confirmPassword:'',
  referralCode:'',
  passwordMode:true,
  roles:[],
  classes:[]

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    
    case GET_ROLES_SUCCESS:
      return {
        ...state,
       roles:action.payload.roles,
       classes:action.payload.courses
      };  

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      let myObj = {};

      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
      if (!action.payload.user.role) {
        myObj = {
          location: '/login',
          isAuthenticated: false,
        }
      }else{
        myObj = { 
          isAuthenticated: true,
          redirect:true
        }
      } 
      return {      
        ...state,
        ...myObj,
             
      };
  
    case CLEAR_FORM:
      return {
        ...state,
        role:'',
        activeClass:'',
        fullName:'',
        email:'',
        password:'',
        referralCode:'',
        passwordMode:true,
      };

    case REGISTER_FAILURE:  
    case LOGIN_FAILURE:  
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    case PASSWORD_CHANGE_SUCCESS:
        return {
          ...state,
          password: '',
          confirmPassword: ''       
      };     
    default:
      return state;
  }
};
export default authReducer;
