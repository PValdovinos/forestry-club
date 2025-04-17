import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberHoursView = () => {
  const [memberHours, setMemberHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // This assumes your backend provides the user's hours based on their session
    const fetchMemberHours = async () => {
      try {
        const res = await axios.get('/api/member/hours');
        setMemberHours(res.data.hours || []);
        setUserName(res.data.name || '');
      } catch (err) {
        console.error(err);
        setError('Failed to load hours.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberHours();
  }, []);

  const totalHours = memberHours.reduce((sum, entry) => sum + entry.hours, 0);
  const totalPoints = memberHours.reduce((sum, entry) => sum + (entry.points || 0), 0);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Welcome {userName || 'Member'}</h2>
      <h4 className="text-center text-muted">Your Volunteer Hour Summary</h4>

      {loading ? (
        <p>Loading your data...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Hours</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {memberHours.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.activity}</td>
                  <td>{entry.hours}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <h5>Total Hours: {totalHours}</h5>
            <h5>Total Points: {totalPoints}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberHoursView;
