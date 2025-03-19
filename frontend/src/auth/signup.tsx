export default function SignUp() {
  return (
    <div className="modalContainer">
      <div className="titleContainer">
        <span className="typewriter-title formTitle">Sign Up</span>
      </div>
      <form className="formWrapper">
        <label htmlFor="username">Username</label>
        <input
          className="input-box"
          type="text"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          className="input-box"
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="input-box"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
