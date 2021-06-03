import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./pages/login";
import ListeOuvrier from "./pages/ouvrier.js/list-ouvrier";
import DrawerMenu from "./components/drawerMenu";
import AjoutOuvrier from "./pages/ouvrier.js/ajout-ouvrier";
import UpdateOuvrier from "./pages/ouvrier.js/update-ouvrier";

function App() {
  const { userId, token, login, logout } = UserAuth();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListeOuvrier} />
        <Route path="/ajout-ouvrier"  component={AjoutOuvrier} />
        <Route path="/update-ouvrier/:id"  component={UpdateOuvrier} />
      </React.Fragment>
    );
  } else {
    routes = <Route path="/" exact component={Login} />;
  }
  return (
    <div>
      <Authcontext.Provider
        value={{ userId: userId, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {token && <DrawerMenu content={routes} />}
          {!token && routes}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
