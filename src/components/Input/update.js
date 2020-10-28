import React, {useState, useEffect, useRef} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
//import {Form} from 'react-bootstrap';
import axios from 'axios';

export default function Update(props) {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');

	const ref_input_name = useRef();

	const onChangeName = (e) => {
		setName(e.target.value);
	}

	const onChangeAge = (e) => {
		setAge(e.target.value);
	}

	const submit = () => {
		const obj = {
			id: props.person.id,
            name: name,
            age: age
        };

        props.updatePerson(obj);											
	}

	const cancel = () => {
		
        props.reset();											
	}

	useEffect(() => {
		setName(props.person.name);
		setAge(props.person.age);
	}, []);
	return(
		<div>
		{console.log(props.person)}
			<form  noValidate autoComplete="off">
			  <TextField ref={ref_input_name} id="name" label="Name" onBlur={onChangeName} defaultValue={props.person.name}/>

			 <br />
			  <TextField id="age" label="Age" onBlur={onChangeAge}  defaultValue={props.person.age}/>
			  <br />
			  <br />
			  <Button variant="contained" color="primary" onClick={submit} >
				  Cập nhật
			  </Button>
			  <Button style={{marginLeft: '10px'}} variant="contained" color="secondary" onClick={cancel} >
				  Hủy
			  </Button>
			</form>
		</div>
	);
	
}

