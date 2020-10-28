/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();


// const rootReducer = combineReducers({
//     form: formReducer
// });

// const store = createStore(rootReducer);
const get_data = () => {
  	console.log('Get data lan 1');
  	trackPromise(
	  axios.get('http://localhost/two_cn/server/api/data')
	  .then(function (response) {
	  	console.log('dang goi api');
	    console.log(response);
	    store.dispatch({
          type: 'SET_DATA',
          data: response.data
          
        });
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  })
	);
};

console.log(get_data());
const defaultValue = {
	listUser: [],
}
const defaultState = defaultValue;

function reducerUser(state = defaultState, action) {
	switch (action.type) {
      case 'ADD':
        add_person(action.formData);
        return state;

      case 'DELETE':
        delete_item(action.id);
        return state;

       case 'SET_DATA':
        let users_data=[...action.data];
        return {...state, listUser:users_data};

       //  case 'SET_MENU_STATE':
       //  let menus={...state,routes:action.data.data};
       //  saveState(menus);
       //  return menus;

       //  case 'SET_LOADING_STATE':
       //  let loading={...state,loading:action.loading,success:action.success};
       //  return loading;

       //  case 'SET_LOADING_PAGE_STATE':
       //  let loader={...state,pageLoader:action.loader};
       //  //console.log(loader);
       //  // if(action.loader==false)
       //  // sleep(2000).then(()=>{
       //  //       return loader;
       //  // });
       //  // else
       //  return loader;

       //  case 'SET_SUCCESS_STATE':
       //  let success={...state,success:action.success};
       //  //saveState(success);
       //  return success;

       // case 'LOGOUT':
       //  postLogout();
       // return defaultValue;

        default:
        return state;
    }
    //return state;
}

const rootReducer = combineReducers({
    reducerUser,
    form: formReducer
});

const store = createStore(rootReducer);

const add_person = (person) => {
        console.log(person);
        axios.post('http://localhost/two_cn/server/api/data', person)
            .then(res => {
                  console.log(res.data);
                  get_data();
            });

  }
const delete_item = (id) => {
  axios.get('http://localhost/two_cn/server/api/delete_data/' + id)
          .then(res => {
              console.log(res.data);
              get_data();
          });
}


ReactDOM.render(
	<Provider store={store}>
	  <Router history={hist}>
	    <Switch>
	      <Route path="/admin" component={Admin} />
	      <Route path="/rtl" component={RTL} />
	      <Redirect from="/" to="/admin/dashboard" />
	    </Switch>
	  </Router>
	</Provider>,
  document.getElementById("root")
);
