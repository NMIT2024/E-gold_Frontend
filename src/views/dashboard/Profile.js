import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { profileUpdate } from "src/reducers/Profile";
import "./Profile.css";
import { fieldInfo, getField } from "src/reducers/Field";
import { fields } from "src/app/Constants";
import { userData } from "src/reducers/Auth";

export default function Profile() {
  const dispatch = useDispatch();
  const response = useSelector(fieldInfo);
  const [data, setData] = useState([])
  const userInfo = useSelector(userData);

  useEffect(() => {
    dispatch(getField('1')) // For demo ICICI clientId as 1
  }, [])

  useMemo(() => {
    setData(JSON.parse(response
      && response.value
      && response.value.data
      && response.value.data.length > 0
      && response.value.data[0].fieldData))
  }, [response])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(profileUpdate(data));
  };

  const getInfo = (data) => {
    console.log(data);
  };
  const setUIValue = (idx) => {
    if(!userInfo.status) return ''
    if(idx == 0){
      return userInfo.user[0].name
    }else if(idx == 2){
      return userInfo.user[0].email
    }else if(idx == 3){
      return userInfo.user[0].phone
    }else{
      return ''
    }
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} id="kycForm">
          <Row>
            {data && data.length > 0 &&
              data.map((item, idx) => {
                return (
                  <Col xs={12} md={6} key={idx}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{item.title}</Form.Label>
                      <Form.Control
                        value={setUIValue(idx)}
                        type={fields[item.type]}
                        placeholder={item.title}
                        {...register(item.title, { required: item.isRequired == '1' ? true : false })}
                      />
                      {errors.fname && <span>This field is required</span>}
                    </Form.Group>
                  </Col>
                )
              })
            }
          </Row>
          <Row style={{ padding: "0 30%" }}>
            <button type="button" className="btn-upload" onClick={getInfo}>Submit</button>
          </Row>
        </Form>
      </Container>
    </>
  );
}
