import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberHoursView = () => {
  const [memberHours, setMemberHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await axios.get('/api/member/hours');
        setMemberHours(res.data.hours || []);
        setUserName(res.data.name || 'Member');
      } catch (err) {
        console.error(err);
        setError('Unable to load your volunteer hours at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  const totalHours = memberHours.reduce((sum, h) => sum + h.hours, 0);
  const totalPoints = memberHours.reduce((sum, h) => sum + (h.points || 0), 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Welcome, {userName}</h2>
          <h5 className="card-subtitle mb-4 text-muted text-center">
            Your Volunteer Hours and Points Tracker
          </h5>

          {loading ? (
            <div className="text-center">Loading your data...</div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                      <th>Hours</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberHours.map((entry, idx) => (
                      <tr key={idx}>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.activity}</td>
                        <td>{entry.hours}</td>
                        <td>{entry.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 d-flex justify-content-around">
                <h5>Total Hours: <span className="badge bg-primary">{totalHours}</span></h5>
                <h5>Total Points: <span className="badge bg-success">{totalPoints}</span></h5>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberHoursView;
