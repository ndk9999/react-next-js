import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    const response = await refresh();
                    const { accessToken } = response.data;
                    console.log(accessToken);

                    setTrueSuccess(true);
                } catch (err) {
                    console.log(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => effectRan.current = true;

        // eslint-disable-next-line
    }, []);

    let content = null;

    if (!persist) { // persist = no
        console.log('No persist');
        content = <Outlet />;
    } else if (isLoading) { // persist = yes, token = no
        console.log('Loading');
        content = <p>Loading ...</p>;
    } else if (isError) { // persist = yes, token = no
        console.log('Error');
        content = (
            <p className="errmsg">
                {error?.data?.message}
                <Link to="/login">Please login again</Link>
            </p>
        );
    } else if (isSuccess && trueSuccess) { // persist = yes, token = yes
        console.log('Success');
        content = <Outlet />;
    } else if (token && isUninitialized) { // persist = yes, token = yes
        console.log('Token and uninit');
        console.log(isUninitialized);
        content = <Outlet />
    }

    return content;
}

export default PersistLogin;