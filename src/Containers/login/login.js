import React, { Component } from "react";
import { Button, Badge, Spinner } from "react-bootstrap";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../store/actions/actionTypes";
import { Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = values => {
    this.setState({ isLoading: true });
    axios
      .post("auth", { email: values.email, password: values.password })
      .then(response => {
        // axios.post('auth', { email: this.state.email, password: this.state.password }).then(response => {

        if (response.status === 200) {
          const token = response.data;
          localStorage.setItem("token", token);
          this.setState({ isLoading: false });
          this.props.onUserLoggedIn(token);
        } else {
          alert(
            `Getting Users Error, Status Code: ${response.status} , Status Text : ${response.statusText}`
          );
          this.setState({ isLoading: false, error: true });
          setTimeout(() => {
            this.setState({ error: false });
          }, 2000);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false, error: true });
        setTimeout(() => {
          this.setState({ error: false });
        }, 2000);
        console.log("Error Getting Users : ", err);
      });
    // event.preventDefault();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Alert variant="primary">Logging in</Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      );
    }
    if (!this.state.isLoading && this.state.error) {
      return <Alert variant="danger">Error Logging in Please Try Again</Alert>;
    } else {
      if (!this.props.token) {
        return (
          <div className="Login">
            <h1>
              <Badge variant="primary" className="mb-5">
                Login
              </Badge>
            </h1>

            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                let errors = {};
                if (!values.email) {
                  errors.email = "Email Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                } else if (!values.password) {
                  errors.password = "Password Required";
                }
                
                
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.handleSubmit(values);
                setSubmitting(false);             
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                
                
                <Form>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  <ErrorMessage  name="email" render={msg => <div className='error-message'>{msg}</div>} />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  <ErrorMessage name="password" component="div" className='error-message' />
                  
                  <Button
                    block
                    disabled={isSubmitting || (Object.keys(errors).length)}
                    type="submit"
                    className="login-button"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-4">
              OR
              <Link className="link sign-up-link m-2" to="/sign-up">
                Sign up
              </Link>
              to create your account
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Redirect to="/"></Redirect>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onUserLoggedIn: token =>
      dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESSFULL, token: token })
    // onUserLoadingFromApi: (loading) => dispatch({ type: actionTypes.LOADING_USERS_FROM_API, loading: loading }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
