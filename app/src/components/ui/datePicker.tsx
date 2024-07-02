import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { isPastDate } from "@@/utils/dateUtils";

interface DatePickerProps {
  id: string;
  field: any;
  placeholder: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, field, placeholder }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => setIsPopoverOpen(false);

  const handleDateSelect = (date: Date | undefined) => {
    field.onChange(date);
    closePopover();
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          id={`${id}-button`}
          data-testid={`${id}-button`}
          variant={"outline"}
          className={cn(
            "w-[full] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
          onClick={() => setIsPopoverOpen(true)}
        >
          {field.value ? format(field.value, "P") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          id={`${id}-calendar`}
          data-testid={`${id}-calendar`}
          mode="single"
          selected={field.value}
          onSelect={handleDateSelect}
          disabled={(date) => isPastDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;