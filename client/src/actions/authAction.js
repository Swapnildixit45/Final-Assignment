import axios from "axios";
import { server_url } from "../config";

export const signUp = (user, navigate) => {
  return (dispatch) => {
    axios
      .post(`${server_url}/user/register`, user)
      .then(() => {
        console.log("registerd succesfully");
        navigate("/login");
      })

      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const signIn = (email, password, navigate) => {
  return (dispatch) => {
    axios
      .post(`${server_url}/user/login`, { email, password })
      .then(async (token) => {
        localStorage.setItem("token", JSON.stringify(token.data.token));
        console.log(token.data);
        dispatch({
          type: "SIGN_IN",
          token: token.data.token,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token?.token || getState().auth.token;
    console.log(token);
    if (token) {
      axios
        .get(`${server_url}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (token) {
            dispatch({
              type: "USER_LOADED",
              user: {
                token,

                ...res.data,
                loaded: true,
              },
            });
          } else {
            console.log("nono");
            return null;
          }
        });
    } else {
      const auth = getState().auth;
      if (!auth.loaded)
        dispatch({
          type: "USER_LOGGED_OUT",
          user: {
            ...auth,
            loaded: true,
          },
        });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
