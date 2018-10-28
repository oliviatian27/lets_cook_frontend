export default function signupReducer(state = {
  currentUser: {}
}, action) {
 console.log(action)
 console.log(action.user);
 switch(action.type) {
   case 'CREATE_USER':
     return Object.assign({}, {
       currentUser: action.user
     });
   default:
     return state;
 }
};
