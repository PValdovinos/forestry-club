CREATE TABLE `users` (
     `user_id` INTEGER AUTO_INCREMENT,
     `username` VARCHAR(255) UNIQUE NOT NULL,
     `user_flags` INTEGER NOT NULL,
     `fname` VARCHAR(255) NOT NULL,
     `lname` VARCHAR(255) NOT NULL,
     `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
     PRIMARY KEY (`user_id`)
);

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
CREATE TABLE `workhours` (
     `submission_id` int NOT NULL,
     `time_in` time NOT NULL,
     `time_out` time NOT NULL,
     `date` date NOT NULL,
     `user_id` int NOT NULL,
     `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `under_review` tinyint(1) NOT NULL,
     `accepted` tinyint(1) NOT NULL,
     PRIMARY KEY (`submission_id`)
)