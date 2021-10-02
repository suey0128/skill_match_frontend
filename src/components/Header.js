import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentUser, setUserStatus } from '../mainsSlice';

function Header() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    const handleLogout = () => {
        dispatch(setCurrentUser(null))
        dispatch(setUserStatus("none"))
    }

    return (
        <div className="header">
            
            {currentUser !== null ?
                <>
                    <div className="header-left">
                        <NavLink exact to="/" className="nav-link" style={{ textDecoration: 'none' }}>
                            <h2 className="logo">Skilled Match</h2>
                        </NavLink>
                        <div className="nav-menu">
                            <NavLink to="/profile" className="nav-link" style={{ textDecoration: 'none' }} activeStyle={{fontWeight: "bold"}}>
                                Profile
                            </NavLink>
                            <NavLink to="/matches" className="nav-link" style={{ textDecoration: 'none' }} activeStyle={{fontWeight: "bold"}}>
                                Matches
                            </NavLink>
                            <NavLink to="/events" className="nav-link" style={{ textDecoration: 'none' }} activeStyle={{fontWeight: "bold"}}>
                                Events
                            </NavLink>
                        </div>
                    </div>

                    <div className="header-right">
                        <NavLink exact to="/" style={{ textDecoration: 'none' }}>
                            <button className="logout" onClick={handleLogout}>Logout</button>
                        </NavLink>
                    </div>
                </>
                
                : <>
                     <h2 className="logo">Skilled Match</h2>
                     <div className="header-right">
                        <NavLink to="/login" style={{ textDecoration: 'none' }}>
                            <button className="login">Login</button>
                        </NavLink>
                        <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                            <button className="signup">Sign Up</button>
                        </NavLink>
                    </div>
                </>
            }
        </div>
    );
}
  
export default Header;