import "./Login.css";

function Login(): JSX.Element {
    return (
        <div className="Login">
            <h2>Login Page</h2>
            <form>
                <input type="text" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
