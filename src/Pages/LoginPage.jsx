import LoginForm from "../Components/LoginForm";
import Container from "../Container/Container";

function LoginPage(){
    return(
        <div className="h-screen flex justify-center items-center">
            <Container>
                <LoginForm />
            </Container>
        </div>
    )
}
export default LoginPage