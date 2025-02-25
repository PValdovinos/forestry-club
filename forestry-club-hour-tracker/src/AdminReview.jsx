import AdminNotify from "./components/AdminNotify";

import ToastContainer from 'react-bootstrap/ToastContainer';

const test_data = [
    {
        ['name']: 'John Doe',
        ['time_in']: Date.now(),
        ['time_out']: Date.now()
    },
    {
        ['name']: 'John Doe',
        ['time_in']: Date.now(),
        ['time_out']: Date.now()
    }
]

function AdminReview() {
    return (
        <>
            <ToastContainer>
                {
                    test_data.map(o =>
                        <AdminNotify
                            key={o.name + o.time_in.toString()}
                            name={o.name}
                            time_in={o.time_in}
                            time_out={o.time_out}
                        />
                    )
                }
            </ToastContainer>
        </>
    );
}

export default AdminReview;