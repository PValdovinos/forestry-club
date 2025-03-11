import { BrowserRouter, Routes, Route } from "react-router";

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