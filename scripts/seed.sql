INSERT INTO users (email, password, user_flags, fname, lname) VALUES
('alice@example.com', '$2y$10$lP5jUz1Bl7Yw3JS3HgzzYOIdAje9cvM4XKBeOxmd2vXH6r/dBrD0y', 0, 'Alice', 'Anderson'), -- pass123
('bob@example.com', '$2y$10$n8H8eDAjGW8V3ABQIrWxteV4uOxTOYMHdFCULUQlrbG.3A9WxUGle', 1, 'Bob', 'Brown'), -- bobsecure
('carla@example.com', '$2y$10$eRwzGT7mvKcrObLKghx3YulDQ5qxqY.EZsIYJHDXX.V97vUy2fNEq', 0, 'Carla', 'Carpenter'), -- carla456
('dan@example.com', '$2y$10$aSiYZoBbdOE36Aa.A9UeNeQ3lLgCLWIQHtztmE/2Jb76qxxxyOAXW', 1, 'Dan', 'Davis'), -- danny789
('emily@example.com', '$2y$10$uJplIvns8A/jbUNMScUBqO4KnrSEbdwMl/Y7n1OXmyO0F1EflIVwK', 0, 'Emily', 'Evans'), -- empass
('frank@example.com', '$2y$10$RxFEHj8Tq2qEAcWWZ60rXujdzCEtSp86BHzTC4txZ9MbOiMmp9yW6', 1, 'Frank', 'Foster'), -- frankie1
('grace@example.com', '$2y$10$8KhOEdtZvtblvWKyEjg8/OxHGqCzMlruol0sD2oWf5rj.V3sDJY1C', 0, 'Grace', 'Green'), -- graceluv
('harry@example.com', '$2y$10$8nH.y.Y0Er26p3fZdSwgRO6cLAbV9yG9kAUVgyDdTfA9kuR8I0HjS', 1, 'Harry', 'Hill'), -- harrypwd
('ivy@example.com', '$2y$10$0zh0xlAOLx4EuNjvUMExBuxjR7BRHDKzD.C3ybclUGbhqxN8Tqxfu', 0, 'Ivy', 'Iverson'), -- ivyivy
('jack@example.com', '$2y$10$kG1mQZ0/OsA9JppcVZCZ3e.EE6T2JgJgHPXsGcTFTCmEK9FqocBtW', 1, 'Jack', 'Johnson'); -- jackjack

INSERT INTO workhours (time_in, time_out, date, user_id, under_review, accepted)
VALUES
('09:00:00', '17:00:00', '2025-05-01', 1, 0, 1),
('10:00:00', '14:00:00', '2025-05-02', 1, 0, 1),
('08:30:00', '12:30:00', '2025-05-03', 2, 1, 0),
('09:15:00', '17:15:00', '2025-05-01', 3, 0, 1),
('09:00:00', '13:00:00', '2025-05-04', 4, 0, 1),
('13:00:00', '17:00:00', '2025-05-05', 5, 1, 0),
('08:00:00', '12:00:00', '2025-05-06', 6, 0, 1),
('09:00:00', '17:00:00', '2025-05-06', 7, 1, 0),
('11:00:00', '15:00:00', '2025-05-07', 8, 0, 1),
('09:00:00', '12:00:00', '2025-05-07', 9, 0, 1),
('10:00:00', '16:00:00', '2025-05-08', 10, 0, 1);