import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, Logging, User, LINK_LIST} from '../pages/';
import {Footer, Header} from '../components/'

function AppRouter() {
    return(
        <Router>
            <div className="router container">
                <Header />
                <Routes>
                    <Route exact path={LINK_LIST.Home} element={<Home />}/>
                    <Route path={LINK_LIST.Logging} element={<Logging />}/>
                    <Route path={LINK_LIST.User} element={<User />}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default AppRouter;
