import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

function AdminNotify({ name, time_in, time_out }) {

    return <>
        <Toast>
            <Toast.Header>
                <strong>{name}</strong>
            </Toast.Header>
            <Toast.Body>
                <strong>Time In:</strong> {time_in}
                <strong>Time Out:</strong> {time_out}

            </Toast.Body>
        </Toast>
    </>
}

AdminNotify.propTypes = {
    name: PropTypes.string,
    time_in: PropTypes.instanceOf(Date),
    time_out: PropTypes.instanceOf(Date)
}

export default AdminNotify;