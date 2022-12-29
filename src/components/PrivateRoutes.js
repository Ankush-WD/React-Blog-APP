import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes =({ children })=> {
    const authUser = useSelector( state=> state.auth);
    console.log(authUser);
    
    if (!authUser.isLoggedIn) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoutes;