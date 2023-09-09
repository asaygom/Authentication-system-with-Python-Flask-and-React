const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      isAuth: false,
      user: null,
      loading: false,
    },
    actions: {
      login: (state, navigate) => {
        fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              setStore({ isAuth: true });
              localStorage.setItem("token", response.access_token);
              navigate("/");
            }
          })
          .catch((error) => console.error("Error:", error));
      },

      createUser: (state, navigate) => {
        fetch("http://localhost:5000/signup", {
          method: "POST", // or 'PUT'
          body: JSON.stringify(state), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              console.log("response", response);
              setStore({ isAuth: true });
              localStorage.setItem("token", response.access_token);
              navigate("/");
            } else {
            }
          })
          .catch((error) => console.error(error.msg));
      },
      getUser: () => {
        setStore({ loading: true });
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/get_profile", {
          method: "GET", // or 'PUT' // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response", response);
            if (response.success) {
              setStore({ user: response.user });
            }
            setStore({ loading: false });
          })
          .catch((error) => console.error(error.msg));
      },
      logout: () => {
        setStore({ isAuth: false, user: null });
        localStorage.removeItem("token");
      },
    },
  };
};

export default getState;
