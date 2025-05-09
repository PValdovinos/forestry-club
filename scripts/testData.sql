-- John Doe (user_id = 1)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('08:00:00', '16:00:00', '2025-03-01', FALSE, TRUE, 1),
('09:00:00', '17:30:00', '2025-03-02', TRUE, FALSE, 1),
('08:45:00', '15:45:00', '2025-03-03', FALSE, TRUE, 1);

-- Alice Smith (user_id = 2)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('10:00:00', '18:00:00', '2025-03-01', FALSE, TRUE, 2),
('11:30:00', '19:30:00', '2025-03-02', TRUE, FALSE, 2),
('12:00:00', '20:00:00', '2025-03-03', FALSE, TRUE, 2);

-- Bob Jones (user_id = 3)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('07:00:00', '15:00:00', '2025-03-01', FALSE, TRUE, 3),
('08:00:00', '16:30:00', '2025-03-02', FALSE, TRUE, 3),
('09:15:00', '17:15:00', '2025-03-03', FALSE, TRUE, 3),
('10:45:00', '19:00:00', '2025-03-04', TRUE, FALSE, 3);

-- Charlie Miller (user_id = 4)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('06:00:00', '14:00:00', '2025-03-01', FALSE, TRUE, 4),
('07:30:00', '15:30:00', '2025-03-02', FALSE, TRUE, 4),
('09:00:00', '17:00:00', '2025-03-03', FALSE, TRUE, 4),
('10:15:00', '18:15:00', '2025-03-04', TRUE, FALSE, 4),
('11:45:00', '20:00:00', '2025-03-05', FALSE, TRUE, 4);

-- Dana Johnson (user_id = 5)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('05:30:00', '13:30:00', '2025-03-01', FALSE, TRUE, 5),
('06:45:00', '14:45:00', '2025-03-02', FALSE, TRUE, 5);

-- Frank Garcia (user_id = 7)
INSERT INTO workhours (time_in, time_out, date, under_review, accepted, user_id) VALUES
('07:15:00', '15:15:00', '2025-03-01', FALSE, TRUE, 7),
('08:30:00', '16:30:00', '2025-03-02', FALSE, TRUE, 7),
('09:45:00', '18:00:00', '2025-03-03', TRUE, FALSE, 7),
('11:00:00', '19:30:00', '2025-03-04', FALSE, TRUE, 7),
('12:30:00', '22:00:00', '2025-03-05', FALSE, TRUE, 7);