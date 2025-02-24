import AdminNav from "./AdminNav";
import AdminTable from "./AdminTable";

const test_data = {
    ['date']: Date.now(),
    ['name']: 'John Doe',
    ['hours']: 7.5
}

function AdminReview() { 
    return (
        <>
            <p>AdminReview Success</p>
            <AdminNav />
            <AdminTable />
        </>
    );
}

export default AdminReview;