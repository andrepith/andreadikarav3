import { useState } from "react";
import { connect } from "react-redux";
import { login } from "src/store/actions";

const Login = ({
  login,
  isAuthenticated,
  loading,
}: {
  login: Function;
  isAuthenticated: boolean;
  loading: boolean;
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  const { email, password } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await setDisabled(true);
    login(email, password).then(() => setDisabled(false));
  };

  return (
    <section className="login wrapper">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-title">Please sign in</div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={6}
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary login-button"
          value={disabled ? "Signing In..." : "Sign In"}
          disabled={disabled}
        />
        <p className="text-muted">© 2021-{new Date().getFullYear()}</p>
      </form>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
