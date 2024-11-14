import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
export function EnterTaskCard({ onAddTask }) {
	const inputRef = useRef();
	const handleAddTask = () => {
		const taskValue = inputRef.current.value.trim();

		if (taskValue === "") return;

		// Axios call to add the task
		axios
			.post("http://localhost:3001/add", { name: taskValue })
			.then((response) => {
				console.log("Task added:", response.data);
				onAddTask(response.data);
				inputRef.current.value = "";
			})
			.catch((err) => console.error("Error adding task:", err));
	};

	return (
		<Card className="flex items-center justify-evenly h-[10vh] gap-20 w-[90vw] md:w-[50vw]">
			<Input
				className="ml-5"
				id="name"
				placeholder="Enter your task"
				ref={inputRef}
			/>
			<Button className="mr-5" onClick={handleAddTask}>
				Add
			</Button>
		</Card>
	);
}
