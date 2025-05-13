import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function AdminNotify({ id, name, time_in, time_out, date_volunteered, date_submitted, onAccept = ()=>{}, onDeny = ()=>{}, setReviewData = ()=>{}, reviewData }) {

    const [show, setShow] = useState(true);

    const handleHide = () => setShow(false);

    const submission_id = id;
    const time_in_readable = time_in;
    const time_out_readable = time_out;
    const date_volunteered_readable = date_volunteered;
    const date_submitted_readable = new Date(date_submitted).toLocaleDateString();

    const accept = (id) => {
        setReviewData(reviewData.filter(entry => entry.submission_id != id));
        handleHide();
        onAccept(id);
    }

    const deny = (id) => {
        setReviewData(reviewData.filter(entry => entry.submission_id != id));
        handleHide();
        onDeny(id);
    }

    return (
        <Toast show={show} style={{margin: "1%",}}>
            <Toast.Header closeButton={false}>
                <strong>{name}</strong>
            </Toast.Header>
            <Toast.Body>
                <Row>
                    <Col>
                        <strong>Date of Volunteer:</strong> {date_volunteered_readable}<br />
                        <strong>Time In:</strong> {time_in_readable}<br />
                        <strong>Time Out:</strong> {time_out_readable}<br />
                        <strong>Submitted on:</strong> {date_submitted_readable}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={ () => { deny(submission_id) } }>Deny</Button>
                        <Button variant="primary" onClick={ () => { accept(submission_id) } }>Accept</Button>
                    </Col>
                </Row>


            </Toast.Body>
        </Toast>

    )
}

AdminNotify.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    time_in: PropTypes.string,
    time_out: PropTypes.string,
    date_volunteered: PropTypes.string,
    date_submitted: PropTypes.instanceOf(Date),
    onAccept: PropTypes.func,
    onDeny: PropTypes.func,
    setReviewData: PropTypes.func,
    reviewData: PropTypes.array
}

export default AdminNotify;