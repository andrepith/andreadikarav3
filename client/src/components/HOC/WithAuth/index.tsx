import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextComponentType } from "next";
import { useSelector } from "react-redux";
import { IRootState } from "src/store/reducers";

const withAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = () => {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const isAuthenticated = useSelector(
      (state: IRootState) => state.auth.isAuthenticated
    );

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
