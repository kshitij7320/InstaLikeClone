import "../style/form.scss"
import { Link } from "react-router"
const Register = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form>
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <p>Already Have an account ? <Link className="toggleAuthForm" to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register
