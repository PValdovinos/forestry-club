CREATE TABLE `users` (
     `user_id` INTEGER AUTO_INCREMENT,
     `username` VARCHAR(255) UNIQUE NOT NULL,
     `user_flags` INTEGER NOT NULL,
     `fname` VARCHAR(255) NOT NULL,
     `lname` VARCHAR(255) NOT NULL,
     `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
     PRIMARY KEY (`user_id`)
);
CREATE TABLE `workhours` (
     `submission_id` INTEGER AUTO_INCREMENT,
     `time_in` DATETIME NOT NULL,
     `time_out` DATETIME NOT NULL,
     `user_id` INTEGER NOT NULL,
     `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
     `under_review` BOOLEAN NOT NULL,
     `accepted` BOOLEAN NOT NULL,
     PRIMARY KEY (`submission_id`),
     FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);