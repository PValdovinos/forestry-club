-- Insert dummy users (some users will have no work hours)
-- Generated with Chatgpt (so dont trust the math completely)
INSERT INTO users (username, user_flags, fname, lname) VALUES
('jdoe', 1, 'John', 'Doe'),          -- 23.5 hours
('asmith', 2, 'Alice', 'Smith'),      -- 24 hours
('bjones', 0, 'Bob', 'Jones'),        -- 35.25 hours
('cmiller', 1, 'Charlie', 'Miller'),  -- 41.75 hours
('djohnson', 3, 'Dana', 'Johnson'),   -- 16.5 hours
('esullivan', 1, 'Emma', 'Sullivan'), -- 0 hours (for testing)
('fgarcia', 2, 'Frank', 'Garcia');    -- 38.25 hours

-- Insert dummy work hours (0-10 entries per user)
INSERT INTO workhours (time_in, time_out, user_id, under_review, accepted) VALUES
-- John Doe (23.5 hours)
('2025-03-01 08:00:00', '2025-03-01 16:00:00', 1, FALSE, TRUE), -- 8h
('2025-03-02 09:00:00', '2025-03-02 17:30:00', 1, TRUE, FALSE), -- 8.5h
('2025-03-03 08:45:00', '2025-03-03 15:45:00', 1, FALSE, TRUE), -- 7h

-- Alice Smith (24 hours)
('2025-03-01 10:00:00', '2025-03-01 18:00:00', 2, FALSE, TRUE), -- 8h
('2025-03-02 11:30:00', '2025-03-02 19:30:00', 2, TRUE, FALSE), -- 8h
('2025-03-03 12:00:00', '2025-03-03 20:00:00', 2, FALSE, TRUE), -- 8h

-- Bob Jones (32.75 hours)
('2025-03-01 07:00:00', '2025-03-01 15:00:00', 3, FALSE, TRUE), -- 8h
('2025-03-02 08:00:00', '2025-03-02 16:30:00', 3, FALSE, TRUE), -- 8.5h
('2025-03-03 09:15:00', '2025-03-03 17:15:00', 3, FALSE, TRUE), -- 8h
('2025-03-04 10:45:00', '2025-03-04 19:00:00', 3, TRUE, FALSE), -- 8.25h

-- Charlie Miller (40.25 hours)
('2025-03-01 06:00:00', '2025-03-01 14:00:00', 4, FALSE, TRUE), -- 8h
('2025-03-02 07:30:00', '2025-03-02 15:30:00', 4, FALSE, TRUE), -- 8h
('2025-03-03 09:00:00', '2025-03-03 17:00:00', 4, FALSE, TRUE), -- 8h
('2025-03-04 10:15:00', '2025-03-04 18:15:00', 4, TRUE, FALSE), -- 8h
('2025-03-05 11:45:00', '2025-03-05 20:00:00', 4, FALSE, TRUE), -- 8.25h

-- Dana Johnson (16.5 hours)
('2025-03-01 05:30:00', '2025-03-01 13:30:00', 5, FALSE, TRUE), -- 8h
('2025-03-02 06:45:00', '2025-03-02 14:45:00', 5, FALSE, TRUE), -- 8h

-- Emma Sullivan (0 hours) - No work entries for testing missing data

-- Frank Garcia (42.25 hours)
('2025-03-01 07:15:00', '2025-03-01 15:15:00', 7, FALSE, TRUE), -- 8h
('2025-03-02 08:30:00', '2025-03-02 16:30:00', 7, FALSE, TRUE), -- 8h
('2025-03-03 09:45:00', '2025-03-03 18:00:00', 7, TRUE, FALSE), -- 8.25h
('2025-03-04 11:00:00', '2025-03-04 19:30:00', 7, FALSE, TRUE), -- 8.5h
('2025-03-05 12:30:00', '2025-03-05 22:00:00', 7, FALSE, TRUE); -- 9.5h