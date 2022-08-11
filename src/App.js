import "./App.css";
import Home from "./screens/customers/home";
import FormContact from "./components/util/contact_form";
import { ProvideAuth } from "./context/use-auth.hook";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./context/use-auth.hook";
import { dev } from "./config.json";
import ApolloWrapper from "./context/Apollo_wrapper";
import SignupAut from "./components/user-managment/signup-auth";
import SignupInfo from "./components/user-managment/signup-info";
import SignupComp from "./components/user-managment/signup-company";
import SignIn from "./components/user-managment/sign-in";
import Dashboard from "./screens/promoters/dashboard";
import AccountActivationView from "./components/user-managment/user-activation";
import { ProvideSnackbar } from "./context/use-snackbar.hook";
import SnackbarWrapper from "./components/util/snackbar";
import CustomerContact from "./screens/customers/contact";
import Contact from "./components/customer/contact";
import AdminDashboard from "./screens/superadmin/super-admin-dashboard";
import IntroductionScreen from "./screens/customers/introduction";

function App() {
  askUserPermission();
  return (
    <ProvideSnackbar>
      <ApolloWrapper>
        <ProvideAuth>
          <Router>
            <Switch>
              <ProtectedRoute path={dev.route.customer.dasbhoard}>
                <Dashboard />
              </ProtectedRoute>

              <ProtectedRoute path={dev.route.customer.form}>
                <FormContact />
              </ProtectedRoute>

              <ProtectedRoute path={dev.route.customer.account_activation}>
                <AccountActivationView />
              </ProtectedRoute>

              <Route path={"/help"}>
                <IntroductionScreen />
              </Route>
              <Route path={dev.route.customer.home}>
                <Home />
              </Route>
              <Route path={"/"} exact>
                <IntroductionScreen />
              </Route>
              <Route path={dev.route.customer.company_register}>
                <SignupComp />
              </Route>
              <Route path={dev.route.customer.sign_up_auth}>
                <SignupAut />
              </Route>
              <Route path={dev.route.customer.user_sign_up}>
                <SignupInfo />
              </Route>
              <Route path={dev.route.customer.sign_in}>
                <SignIn />
              </Route>
              <Route path={dev.route.customer.contact}>
                <CustomerContact />
              </Route>
              <Route path={dev.route.customer.who}>
                <Contact />
              </Route>
              <Route path={dev.route.customer.home}>
                <Redirect to={dev.route.customer.sign_in} />
              </Route>
              <Route path={dev.route.super_admin}>
                <AdminDashboard />
              </Route>
            </Switch>
          </Router>
          <SnackbarWrapper />
        </ProvideAuth>
      </ApolloWrapper>
    </ProvideSnackbar>
  );
}
async function askUserPermission() {
  return await Notification.requestPermission();
}
function ProtectedRoute({ children, ...rest }) {
  const { sessionData } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return sessionData?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: dev.route.customer.sign_in,
              state: { location: location },
            }}
          />
        );
      }}
    />
  );
}
export default App;
