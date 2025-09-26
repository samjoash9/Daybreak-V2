import React from "react";
import Header from '../../components/layout/Header'
import AuthForm from '../../components/layout/AuthForm'

const SignUp = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header AuthButtonTitle="Login" />

            <div className="flex flex-1 items-center justify-center">
                <AuthForm mode="signin" />
            </div>
        </div>
    )
}

export default SignUp;