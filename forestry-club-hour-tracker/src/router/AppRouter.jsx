import { BrowserRouter, Routes, Route } from "react-router"

import AdminReview from '../pages/AdminReview'
import AdminMemberView from '../pages/AdminMemberView'
import AdminClubView from '../pages/AdminClubView'
import Navigation from '../Navigation'
import Home from '../pages/Home'
import MemberHoursView from '../pages/MemberHoursView'
import LoginPortal from './../pages/LoginPortal'
import AddMember from "../pages/Signup"
import MemberHome from './../pages/MemberHome'
import { useAuth } from './../AuthContext'
import { ADMIN_ACTIVATED, USER_ACTIVATED } from "../projectVariables"

const AppRouter = () => {
    const { user } = useAuth()

    if (!user) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element = {<Navigation />}>
                        <Route index element={<LoginPortal />} />
                        <Route path='/signup' element={<AddMember />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    } else {
        if(user.user_flags === USER_ACTIVATED) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigation />}>
                            <Route index element={<MemberHome />} />
                            <Route path='/member/:email' element={<MemberHoursView />}/>
                            <Route path='/member/:member' element={<MemberHoursView />}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            )
        } else if (user.user_flags === ADMIN_ACTIVATED) {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigation />}>
                            <Route index element={<Home />} />
                            <Route path='/adminReview' element={<AdminReview />} />
                            <Route path='/adminClub/:email' element={<AdminMemberView />} />
                            <Route path='/adminClub' element={<AdminClubView />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            )
        }
    }  
}

export default AppRouter