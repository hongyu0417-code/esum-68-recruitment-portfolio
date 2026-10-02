CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`full_name` text NOT NULL,
	`matric_number` text NOT NULL,
	`ic_number` text,
	`phone_number` text NOT NULL,
	`personal_email` text NOT NULL,
	`siswa_email` text NOT NULL,
	`study_department` text NOT NULL,
	`year_of_study` text NOT NULL,
	`first_choice` text NOT NULL,
	`second_choice` text,
	`commitments` text NOT NULL,
	`answers_json` text NOT NULL,
	`cv_key` text,
	`cv_file_name` text,
	`status` text DEFAULT 'new' NOT NULL
);
