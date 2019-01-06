export const login = async body => {
  const url = "https://pitch-battles-api.herokuapp.com/login";

  const options = {
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const signUp = async body => {
  const url = "https://pitch-battles-api.herokuapp.com/api/v1/users";

  const options = {
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const userFetch = async webToken => {
  const url = "https://pitch-battles-api.herokuapp.com/api/v1/dashboard/";

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `bearer ${webToken}`,
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const forgotMyPasswordCall = async email => {
  console.log(email);
  const url = "https://pitch-battles-api.herokuapp.com/password/forgot";

  const options = {
    body: JSON.stringify({ email: email }),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const changeProfileFetch = async (name, id, webToken) => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/users/`;

  const options = {
    body: JSON.stringify(name),
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const changePasswordFetch = async (
  oldPassword,
  newPassword,
  webToken
) => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/users/`;

  const body = {
    current_password: oldPassword,
    password: newPassword
  };

  const options = {
    body: JSON.stringify(body),
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const createClassFetch = async (name, webToken) => {
  const body = {
    name
  };

  const url = `https://pitch-battles-api.herokuapp.com/api/v1/classes/`;

  const options = {
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};

export const leaveClassFetch = async (student_id, class_id, webToken) => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/users/${student_id}/classes/${class_id}`;

  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};

export const resetPasswordFetch = async (password, token) => {
  const url = `https://pitch-battles-api.herokuapp.com/password/reset`;

  const body = {
    password,
    token
  };

  const options = {
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};

export const teacherAllClassesFetch = async webToken => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/teacher_dashboard`;

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};

export const teacherSpecificClassFetch = async (id, webToken) => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/teacher_dashboard/classes/${id}`;

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};

export const deleteClassFetch = async (id, webToken) => {
  const url = `https://pitch-battles-api.herokuapp.com/api/v1/classes/${id}`;

  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${webToken}`
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};
