import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextComponentType } from "next";
import { useSelector } from "react-redux";

const withAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = () => {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    // @ts-ignore
    const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setLoaded(true);
      }
    }, []);

    return loaded ? <Component /> : <div />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
