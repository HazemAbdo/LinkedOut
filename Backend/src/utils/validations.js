const checkRequired = (value) => {
  if (value === undefined || value === null || value === "") {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

const validateBody = (body) => {
  if (body == null || body == "") {
    return { ok: false, message: "Missing body" };
  }
  if (
    !checkRequired(body.username) ||
    !checkRequired(body.email) ||
    !checkRequired(body.password) ||
    !checkRequired(body.country) ||
    !checkRequired(body.city) ||
    !checkRequired(body.current_position)
  ) {
    return {
      ok: false,
      message:
        "One of the following fields is missing: username, email, password, country, city, current_position",
    };
  }
  if (!validateEmail(body.email)) {
    return {
      ok: false,
      message: "Email is not valid",
    };
  }
  if (!validatePassword(body.password)) {
    return {
      ok: false,
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    };
  }
  return {
    ok: true,
    message: "OK",
  };
};

module.exports = {
  validateBody,
  validatePassword,
};
