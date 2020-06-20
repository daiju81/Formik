import React, { Component } from 'react';
import Router from 'next/router';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("メールアドレスの形式に誤りがあります")
    .required("メールアドレスは必須です"),
  password: Yup.string().required("パスワード設定は必須です"),
  confirmPassword: Yup.string()
    .required("設定したパスワードを再入力してください")
    .oneOf([Yup.ref("password")], "パスワードが一致しません"),
});
class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFormState = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  /**
   * フォーム送信後の処理
   */
  handleSubmit(form) {
    // 値をコンソール表示
    console.log(form);
  }
  render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={this.defaultFormState}
        validationSchema={validationSchema}
      >
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <Field name="password" type="password" placeholder="Password" />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
          <button type="submit">Submit</button>
          <ErrorMessage name="email" component="div" className="invalidForm" />
          <ErrorMessage
            name="password"
            component="div"
            className="invalidForm"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="invalidForm"
          />
        </Form>
      </Formik>
    );
  }
}

const Index = () => (
  <div>
    <p>Hello</p>
    <RegistrationForm />
  </div>
);

export default Index;