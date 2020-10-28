import React, {useState, useEffect, useRef} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";

const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Không được để trống'
    } else if (values.name.length < 2) {
      errors.name = 'Nhập ít nhất 2 ký tự'
    }
    if (!values.age) {
      errors.age = 'Không được để trống'
    } 
    
    return errors
  }

const renderField = (props) => {
	const { input, label, valueInput, type, meta: { touched, error, warning } } = props;
	input.value = valueInput;
	return (
	<div>
	  <label className="control-label">{label}</label>
	  <div>
	    <input {...input} placeholder={label} type={type} className="form-control"/>
	    {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
	  </div>
	</div>
	);
}

const Create = (props) => {
	/*--props--*/
	const { handleSubmit, pristine, reset, submitting } = props;



	/*--Variable--*/




	/*--state--*/
	const dataForm = props.dataForm;




	/*--method--*/
	const cancel = props.cancel;



	/**--style--*/
	
	return(
		<div>
			<form  onSubmit={ handleSubmit }>
			  <div className="form-group">
			  	{console.log(dataForm.name)}
		        <Field name="name" component={renderField} label="Name" valueInput={dataForm.name}/>
		      </div>
		      <div className="form-group">
		        <Field name="age" component={renderField} label="Age" valueInput={dataForm.age}/>
		      </div>
			  <br />
			  <br />
			  <div className="form-group">
		        <button type="submit" className="btn btn-primary">Submit</button>
		        <Button style={{marginLeft: '10px'}} variant="contained" color="secondary" onClick={cancel}>
				  Hủy
			  	</Button>
		      </div>
			  
			</form>
		</div>
	);
	
}

Create =  reduxForm({
  form: 'create', // a unique identifier for this form
  validate
})(Create)

export default connect(
	state => ({
    	initialValues: state.account.dataForm // pull initial values from account reducer
  	}),
  	{ load: loadAccount }   
)(Create)



