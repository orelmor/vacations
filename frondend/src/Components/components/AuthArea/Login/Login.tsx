import { useForm } from "react-hook-form";
import CredentialsModel from "../../../../Models/CredentialsModel";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";
import authService from "../../../../Services/AuthService";
import { authStore } from "../../../../Redux/AuthState";

function Login(): JSX.Element {

    const navigate = useNavigate()
    const {register ,handleSubmit} = useForm<CredentialsModel>()

    async function send(credentials:CredentialsModel) {
        try {
            await authService.login(credentials)
            notificationService.succees('Wellcome back')
            if(authStore.getState().user.role === "Admin"){
                navigate("/vacationManager")

            }else{
                navigate("/vacationList")

            }
        } catch (err:any) {
            notificationService.error(err)
        }
        
    }
    return (
        <div className="Login">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" placeholder="Email" name="email" required maxLength={50} {...register("email")}/>
                <input type="password" placeholder="Password" name="password" required minLength={4} maxLength={25} {...register("password")} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
