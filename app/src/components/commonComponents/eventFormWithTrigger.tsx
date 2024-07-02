import type { Dispatch, ReactNode, SetStateAction } from "react";
import EventForm from "../createEditEvent/eventForm";
import type { IEvent } from "shared/types";

const EventFormWithTrigger = (setData: Dispatch<SetStateAction<IEvent[]>> | Dispatch<SetStateAction<IEvent | null>>, triggerElement: ReactNode,  deleteEventHandler?: (eventId: string) => void, eventData?: IEvent) => (
    <EventForm eventData={eventData} setData={setData} deleteEventHandler = {deleteEventHandler} key={eventData?._id}>
        {triggerElement}
    </EventForm>
);

export default EventFormWithTrigger;