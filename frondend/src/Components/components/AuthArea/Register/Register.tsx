import "./Register.css";

function Register(): JSX.Element {
    return (
        <div className="Register">
			<h2>Register</h2>
            <form>
                <label >First name</label>
                <input type="text" />

                <label >Last name name</label>
                <input type="text" />

                <label>Email</label>
                <input type="email"/>

                <label>Password</label>
                <input type="password"  />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
