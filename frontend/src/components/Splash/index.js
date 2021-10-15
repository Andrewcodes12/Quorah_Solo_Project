import LoginFormPage from "./LoginFormPage"
import SignupFormModal from "./SignUpFormModal"
import Footer from "../Footer"
import './Splash.css'

const Splash = () => {
    return (
        <>


        <div className="mainDiv">
        <div className="login">
        <div className="loginContainer">
        <LoginFormPage />
        <SignupFormModal />
        </div>
        </div>
        <Footer />
        </div>



        </>
    )
}

export default Splash
