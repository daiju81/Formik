import React, { Component } from 'react';
import Router from 'next/router';
import {
  withFormik,
  Formik
} from 'formik';
import * as yup from 'yup';

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name && <div className="errorText">{errors.name}</div>}
      <input
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        name="email"
      />
      {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ name: "", email: "" }),

  

  // Custom sync validation
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm",
})(MyForm);

const Index = () => (
  <div>
    <p>Hello</p>
    <MyEnhancedForm />
  </div>
);

export default Index;