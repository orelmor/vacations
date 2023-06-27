import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../../Models/UserModel";
import authService from "../../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
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
               
                <input type="text"  placeholder="First name"{...register("firstName")} required minLength={2} maxLength={25}/>

            
                <input type="text" placeholder="Last name" {...register("lastName")} required minLength={2} maxLength={25}/>

                
                <input type="email" placeholder="Email" {...register("email")} required maxLength={50}/>
<br /><br />
                
                <input type="password" placeholder="Password" {...register("password")} required minLength={4} maxLength={25} />
                <button type="submit">Register</button>
                <span>Already have an account?</span>
                <br />
                <NavLink to='/login'>Login</NavLink>
            </form>
        </div>
    );
}

export default Register;
