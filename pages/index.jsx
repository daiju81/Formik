import React, { Component } from 'react';
import Router from 'next/router';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("氏名は必須です"),
  email: Yup.string()
    .email("メールアドレスの形式に誤りがあります")
    .required("メールアドレスは必須です"),
  tel: Yup.string().matches(phoneRegExp, "電話番号の形式に誤りがあります"),
  content: Yup.string(),
});

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFormState = {
      name: "",
      email: "",
      tel: "",
      content: "",
    };
  }
  handleSubmit(form, { resetForm }) {
    console.log(resetForm())
    let text = `■ 名前: ${form.name}\n■ メールアドレス: ${form.email}\n■ 電話番号: ${form.tel}\n■ お問い合わせ内容: ${form.content}`;
    let data = {
      data: `payload={ "text": "${text}"}`,
    };
    try {
      alert("送信しました"+data.data);
      resetForm();
      Router.push("/"); // リダイレクト
    } catch (error) {
      alert("送信に失敗しました");
    }
  }

  render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={this.defaultFormState}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="form-field">
            <Field name="name" type="text" placeholder="氏名" />
          </div>
          <div className="form-field">
            <Field name="email" type="email" placeholder="メールアドレス" />
          </div>
          <div className="form-field">
            <Field name="tel" type="tel" placeholder="電話番号" />
          </div>
          <div className="form-field">
            <Field
              name="content"
              component="textarea"
              placeholder="お問い合わせ内容"
            />
          </div>
          <div className="form-field">
            <button type="submit">送信</button>
          </div>
          <ErrorMessage name="name" component="div" className="invalidForm" />
          <ErrorMessage name="email" component="div" className="invalidForm" />
          <ErrorMessage name="tel" component="div" className="invalidForm" />
          <ErrorMessage
            name="content"
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
    <ContactForm/>
  </div>
);

export default Index;