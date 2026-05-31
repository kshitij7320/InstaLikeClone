import "../style/form.scss"
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
        </div>
    </main>
  )
}

export default Login
