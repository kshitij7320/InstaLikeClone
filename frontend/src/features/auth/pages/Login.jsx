import "../style/form.scss"
import { Link } from "react-router"
const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>login</h1>
            <form>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p>Don't Have an account? <Link className="toggleAuthForm" to="/register">Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
