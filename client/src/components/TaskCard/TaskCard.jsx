import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from 'axios';

export function TaskCard({ taskId, task, status, onDelete, onUpdateStatus }) {
  
  const getBorderColor = (tempStatus) => {
    switch (tempStatus) {
      case 'pending':
        return 'border-red-600';  
      case 'progress':
        return 'border-amber-500'; 
      case 'done':
        return 'border-green-500'; 
      default:
        return 'border-gray-300'; 
    }
  };

  const [currentStatus, setCurrentStatus] = useState(status); // Set initial status from props
  const [borderColor, setBorderColor] = useState(getBorderColor(status)); // Initial border color based on initial status

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus); // Update the current status
    setBorderColor(getBorderColor(newStatus)); // Update the border color based on the new status

    onUpdateStatus(taskId, newStatus); // Call the update function from props
  };

  return (
    <Card className={`flex w-[90vw] border-4 ${borderColor} items-center p-4 md:w-[50vw] `}>
      <CardDescription className="overflow-hidden text-xl text-black">{task}</CardDescription>
      <CardContent className="flex items-center justify-between ml-auto w-[60%] md:w-[50%]">
        <Select onValueChange={handleStatusChange} defaultValue={status}>
          <SelectTrigger id="status">
            <SelectValue placeholder={status.charAt(0).toUpperCase() + status.slice(1)} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onDelete} className="ml-4">Delete</Button>
      </CardContent>
    </Card>
  );
}
