import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../../Models/UserModel";
import authService from "../../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";

function Register(): JSX.Element {

    const {register , handleSubmit} = useForm<UserModel>()
    const navigate = useNavigate()

    async function send(user:UserModel){
        try {   
            await authService.register(user)
            notificationService.succees(`Wellcome ${user.firstName}`)
             navigate("/vacationList")
            
        } catch (err:any) {
            notificationService.error(err)
        }
    }

    return (
        <div className="Register">
			<h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <label >First name</label>
                <input type="text"  {...register("firstName")} required minLength={2} maxLength={25}/>

                <label >Last name</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={25}/>

                <label>Email</label>
                <input type="email" {...register("email")} required maxLength={50}/>

                <label>Password</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={25} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
