CREATE TABLE `chats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`user_id` int,
	CONSTRAINT `chats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` text,
	`response_message` text,
	`chat_id` int,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
