import { BrowserRouter, Routes, Route } from "react-router";

import AdminReview from '../pages/AdminReview';
import AdminMemberView from '../pages/AdminMemberView';
import AdminClubView from '../pages/AdminClubView';
import Navigation from '../Navigation';
import Home from '../pages/Home';
import AddMember from '../components/AddMember';
import MemberView from '../pages/MemberView';

const AppRouter = () => {
 return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='/adminReview' element={<AdminReview />} />
                <Route path='/adminClub/:member' element={<AdminMemberView />} />
                <Route path='/adminClub' element={<AdminClubView />} />
                <Route path='/member' element={<MemberView />} />
                <Route path='/addMember' element={<AddMember />} />
            </Route>
        </Routes>
    </BrowserRouter>
 );
}

export default AppRouter;