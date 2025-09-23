import Header from "../../components/layout/Header/Header";
import AuthForm from "../../components/layout/AuthForm/AuthForm";

const Login = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header AuthButtonTitle="Sign up" />

            <div className="flex flex-1 items-center justify-center">
                <AuthForm mode="login" />
            </div>
        </div>
    )
}

export default Login;