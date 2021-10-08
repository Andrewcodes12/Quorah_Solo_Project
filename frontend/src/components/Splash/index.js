import LoginFormPage from "./LoginFormPage"
import SignupFormModal from "./SignUpFormModal"
import './Splash.css'

const Splash = () => {
    return (
        <>



        <div className="login">
        <div className="loginContainer">
        <LoginFormPage />
        <SignupFormModal />
        </div>
        </div>



        </>
    )
}

export default Splash
