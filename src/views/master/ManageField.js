import React, { useEffect, useMemo, useState } from "react";
import { Row, Container, Table } from "react-bootstrap";
import "./ManageField.css";
import Field from "./Field";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { fieldInfo, getField } from "src/reducers/Field";
import { fields } from "src/app/Constants";
import ToastComponent from "../Common/ToastComponent";
import { toast } from 'react-toastify';

const ManageField = () => {
  const response = useSelector(fieldInfo);
  const dispatch = useDispatch();
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getField('1')) // For demo ICICI clientId as 1
  }, [])

  useMemo(() => {
    if (response
      && response.value
      && response.value.data
      && response.value.data.length > 0
      && response.value.data[0].fieldData) {
      setData(JSON.parse(response.value.data[0].fieldData))
    }
    if(response && response.value && response.value.res) { 
      dispatch(getField('1'))
      toast('Added successfully!')
    }
  }, [response])

  return (
    <>
      <h1>Manage Field</h1>
      <Field />
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Is required</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 &&
                data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.title}</td>
                      <td>{fields[item.type]}</td>
                      <td>{item.isRequired == '1' ? 'Yes' : 'No'}</td>
                      <td>{item.status == '1' ? 'Active' : 'Hide'}</td>
                      <td>
                        <IconButton
                          sx={{
                            color: "#0d6efd",
                          }}
                          variant="primary"
                          type="button"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: "#0d6efd",
                          }}
                          variant="primary"
                          type="button"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
      </Container>
      <ToastComponent />
    </>
  );
};

export default ManageField;
