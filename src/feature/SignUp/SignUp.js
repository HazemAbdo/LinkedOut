import React from "react";

import FormFieldComponent from "../../components/FormField/index";

const SignUp = () => {
  return (
    <>
      <div className="form" key="form">
        <FormFieldComponent
          label="Name"
          type="text"
          value=""
          placeholder="Name"
          name="name"
          className="name"
          errorMsg="Name is required"
        />
        <FormFieldComponent
          label="Email"
          type="email"
          value=""
          placeholder="Email"
          name="email"
          className="email"
          errorMsg="Email is required"
        />
      </div>
    </>
  );
};

export default SignUp;
