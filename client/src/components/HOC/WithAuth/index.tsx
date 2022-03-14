import { useRouter } from "next/router";
import { NextComponentType } from "next";

function withAuth<T>(Component: NextComponentType<T>) {
  const router = useRouter();
  const Auth = (props: any) => {
    // Login data added to props via redux-store (or use react context for example)

    const { isLoggedIn }: { isLoggedIn: boolean } = props;

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return router.push("/");
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
