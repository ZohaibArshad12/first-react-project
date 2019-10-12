import React, {Component} from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './auth.module.css';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from 'axios';
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index';
import {Redirect} from 'react-router-dom';

class Auth extends Component{
    state = {
        contactForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email',
                },
                value: '',
                validationRules: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password',
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 5,
                },
                isValid: false,
                touched: false,
            }
        },
        isFormValid: false,
        isSignUp: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedContactForm = {
            ...this.state.contactForm
        };
        const updatedFormElement = {
            ...updatedContactForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationRules);
        updatedFormElement.touched = true;
        updatedContactForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for(let key in updatedContactForm){
            isFormValid = updatedContactForm[key].isValid && isFormValid;
        }
        
        this.setState({contactForm: updatedContactForm, isFormValid: isFormValid});
    }

    inputBlurHandler = (event, inputIdentifier) => {
        const updatedContactForm = {
            ...this.state.contactForm
        };
        const updatedFormElement = {
            ...updatedContactForm[inputIdentifier]
        };
        updatedFormElement.touched = true;
        
        updatedContactForm[inputIdentifier] = updatedFormElement;

        this.setState({contactForm: updatedContactForm})
    }

    signUpHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for(let key in this.state.contactForm){
            formData[key] = this.state.contactForm[key].value;
        }

        if(this.state.isSignUp){
            this.props.onSignUp(formData);
        }
        else{
            this.props.onSignIn(formData);
        }
        
    }

    switchAuthenticationHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }
    
    render()
    {
        let formElements = [];
        for(let key in this.state.contactForm){
            formElements.push({
                id: key,
                config: this.state.contactForm[key],
            });
        }

        let form = <Spinner></Spinner>

        if(this.props.loading === false){
            form = (<div><form onSubmit={this.signUpHandler}>
            {/* <Input inputtype="input" type="text" name="name" placeholder="Enter your name" /> */}
            {/* <Input elementType="..." elementConfig="..." value="..." />
            <Input inputtype="input" type="email" name="email" placeholder="Enter your email" />
            <Input inputtype="input" type="text" name="street" placeholder="Enter your Street Address" />
            <Input inputtype="input" type="text" name="postalCode" placeholder="Enter your Postal Code" /> */}
            {
                formElements.map(formElement => (
                    <Input elementConfig={formElement.config.elementConfig}
                        elementType={formElement.config.elementType}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.isValid}
                        istouched={formElement.config.touched}
                        blured={(event) => this.inputBlurHandler(event,formElement.id)}
                        key={formElement.id}/>
                ))
            }
            <Button btnType="Success" disabled={!this.state.isFormValid}>{this.state.isSignUp === false ? 'SIGN IN': 'SIGN UP'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthenticationHandler}>
            SWITCH TO {this.state.isSignUp? 'SIGN IN': 'SIGN UP'}
        </Button></div>);
        }
        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = (<Redirect to={this.props.redirectURL}></Redirect>)
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        isAuthenticated: state.authReducer.token !== null,
        redirectURL: state.authReducer.redirectUrl,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp : (authenticationData) => dispatch(actionCreators.onSignUp(authenticationData)), 
        onSignIn : (authenticationData) => dispatch(actionCreators.onSignIn(authenticationData)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));