import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.isAuth) navigate("/login");
    else actions.getUser();
  }, [store.isAuth]);

  if (store.loading) return <h1>loading...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-danger" onClick={() => actions.logout()}>
          Sign out
        </button>
      </div>

      <div>
        <h1 className="m-auto">
          Welcome 
        </h1>
        <h2 className="text-primary mx-2">{store.user?.name} {store.user?.last_name}</h2>
      </div>
    </div>
  );
};

export default Home;
