import React, {useState, useEffect, useCallback, updateState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TableCustom from "components/Table/TableCustom.js";
import Create from "components/Input/create.js";
import Update from "components/Input/update.js";
import axios from 'axios';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {Button} from '@material-ui/core';
import {connect} from "react-redux";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function LayoutCRUD(props) {

  /*--variable--
    person_empty
    titleColumn
  */
  const personEmpty = {
    id: '',
    name: '1',
    age: '2'
  }

 const titleColumn = [
                      ["id", "left"],
                      ["name", "left"],
                      ["age", "left"],
                      ["action", "right"],
                    ];

  /*---state--
    listUser
    statusCreate
    dataForm
    editRow
  */
  const {listUser}=props;
  const [statusCreate, setStatusCreate] = useState(false);
  const [dataForm, setDataForm] = useState(personEmpty);
  const [editRow, set_edit_row] = useState(
                                              {
                                                status: false,
                                                id: -1
                                              }
                                          );

  /*--method--
    editStatusCreate (addForm)
    handleSubmitFormCreate
    editEditRow
    handleSubmitFormEdit
  */
  const handleSubmitFormCreate = (person) => {
        props.dispatch({
          type: 'ADD',
          formData: person
        });

        capNhatDataFormRong();
  }

  const editStatusCreate = () => {
    if(statusCreate)
      setStatusCreate(false);
    else setStatusCreate(true);
  }

  function capNhatDataFormRong() {
    setDataForm(personEmpty);
  }


  const handleDelete = (row) => {
      props.dispatch({
          type: 'DELETE',
          id: row.id
        });
  }

  
  /*--style--*/
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {
          (statusCreate == false) ?
          (
            <Button variant="contained" color="primary" onClick={editStatusCreate}>
              Thêm mới
            </Button>
          ) :
          (
            <Card>
              <CardBody>
                {/*<Table
                  tableHeaderColor="primary"
                  tableHead={titleColumn}
                  tableData={data}
                />*/}
                
                <Create 
                        onSubmit={handleSubmitFormCreate} 
                        cancel={editStatusCreate}
                        dataForm={dataForm}
                />

                { /*<Update person={person_update} updatePerson={update_person} reset={reset}/>*/}
                
              </CardBody>
            </Card>
          )
        }
        
        
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Table Person</h4>
            <p className={classes.cardCategoryWhite}>
              A list person
            </p>
          </CardHeader>
          <CardBody>
            {/*<Table
              tableHeaderColor="primary"
              tableHead={titleColumn}
              tableData={data}
            />*/}
            {console.log(listUser)}
            <TableCustom rows={listUser} 
                         editRow={editRow}
                         delete_item={handleDelete}
                         />
            {/*<TableCustom rows={listUser} 
                         delete={delete_item} 
                         update={pre_update} 
                         editRow={editRow}
                         updatePerson={update_person}
                         cancel={cancel_edit}
                         />*/}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}


export default connect (function(state) {
  console.log("FROM VIEWER:", state);
  return {
    listUser: state.reducerUser.listUser
  };
})(LayoutCRUD);







// const get_data = () => {
  //     console.log('da vao getdata');

  //       trackPromise(
  //         axios.get('http://localhost/two_cn/server/api/data')
  //         .then(function (response) {
  //           console.log(response);
  //           setData(response.data);
  //         })
  //         .catch(function (error) {
  //           // handle error
  //           console.log(error);
  //         })
  //       );
  //   };

  // const get_data = () => {

  //     props.dispatch({
  //         type: 'SET_DATA_STATE',
  //       });
  //     console.log(listUser);
  //   };
  //   
  //   
  // const [data, setData] = useState([]);
  // const data = [
  //               ["Dakota Rice", "Niger", "Oud-Turnhout"],
  //               ["Minerva Hooper", "Curaçao", "Sinaai-Waas"],
  //             ]
  
  // const add_person = (person) => {
  //       console.log(person);
  //       axios.post('http://localhost/two_cn/server/api/data', person)
  //           .then(res => {
  //                 console.log(res.data);
  //                 set_change_event(change_event+1);
  //           });
  // }
  // 
  // 
  


  // const add_person = (person) => {
  //       props.dispatch({
  //         type: 'ADD',
  //         formData: person
  //       });
  // }

  // const delete_item = (row) => {
  //     props.dispatch({
  //         type: 'DELETE',
  //         id: row.id
  //       });
  // }

  // const reset = () => {
  //   set_person_update(person_empty);
  //   setAction('add');
  // }

  // const pre_update = (person) => {
  //   set_person_update(person);
  //   let edit = editRow;
  //   edit.status = true;
  //   edit.id = person.id;
  //   set_edit_row(edit);

  //   console.log(editRow);
  // }

  // const update_person = (person) => {
  //     console.log(person);
  //     axios.post('http://localhost/two_cn/server/api/update_data/' + person.id, person)
  //         .then(res => {
  //               console.log(res.data);
  //               set_change_event(change_event+1);
  //         });

  //     let edit = editRow;
  //     edit.status = false;
  //     edit.id = '';
  //     set_edit_row(edit);
  // }

  // const add_form = () => {
  //   setAction('add');
  // }

  // const cancel_add = () => {
  //   setAction('none');
  // }

  // const cancel_edit = () => {
  //   set_person_update(person_empty);
  //   let edit = editRow;
  //   edit.status = false;
  //   edit.id = "";
  //   set_edit_row(edit);
  // }

  // const submit = (values) => {
  //   alert("submitted");
  //   console.log(values.name);
  // }