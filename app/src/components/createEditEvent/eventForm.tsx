import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import getTranslation from "@/utils/transtationUtil";
import { Form, FormLabel } from "../ui/form";
import { z } from "zod";
import { EventFormSchema } from "@/utils/formSchemas";
import {
	ageGroupLabelWithUpperLetter,
	dateLabelWithUpperLetter,
	descriptionWithUpperLetter,
	locationLabelWithUpperLetter,
	organizerLabelWithUpperLetter,
	shortDescriptionWithUpperLetter,
	timeLabelWithUpperLetter,
	titleLabelWithUpperLetter,
} from "@/constants/commonFormMessages";
import FormActions from "./formActions";
import FormFieldComponent from "../commonComponents/formField";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useRef,
	useState,
} from "react";
import EventCreateMap from "../mapComponents/eventCreateMap";
import { useToast } from "../ui/use-toast";
import { AppError, handleError } from "@/lib/errorHandler";
import { createEvent, deleteEventById, updateEvent } from "@/api/eventsCalls";
import { IEvent } from "shared/types";
import { getTimeStamp } from "../../../../server/utils/time";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isPastDate } from "@@/utils/dateUtils";
import { ACCEPTED_TYPES } from "@/constants/imageConstants";
import { handleFileChange } from "@/utils/imageFileUtils";

const getDefaultFormValues = (eventData?: IEvent) => {
	return {
		organizerName: eventData?.organizerName || "",
		imageUri: eventData?.imageUri || "",
		name: eventData?.name || "",
		shortDescription: eventData?.shortDescription || "",
		description: eventData?.description || "",
		startingDate: eventData?.startingDate
			? new Date(eventData?.startingDate)
			: undefined,
		startingTime: eventData?.startingTime || "",
		ageGroup: eventData?.ageGroup || "",
		location: {
			name: eventData?.location.name || "",
			position: eventData?.location.position || undefined,
		},
	};
};

function addNewEvent(events: IEvent[], newEvent: IEvent) {
	const newEventDate = getTimeStamp(
		newEvent.startingDate,
		newEvent.startingTime
	);

	const index = events.findIndex((event) => {
		const eventDate = getTimeStamp(event.startingDate, event.startingTime);
		return newEventDate < eventDate || isPastDate(new Date(event.startingDate));
	});

	if (index === -1) {
		events.push(newEvent);
	} else {
		events.splice(index, 0, newEvent);
	}

	return events;
}

function changeEvent(data: IEvent[] | IEvent, changedEvent: IEvent) {
	let result: IEvent[] | IEvent = changedEvent;

	if (Array.isArray(data)) {
		const indexToUpdate = data.findIndex(
			(event) => event._id === changedEvent._id
		);

		if (indexToUpdate !== -1) {
			data[indexToUpdate] = changedEvent;
		}

		result = data;
	}

	return result;
}

export interface EventFormProps {
	eventData?: IEvent;
	setData: Dispatch<SetStateAction<IEvent[]>> | Dispatch<SetStateAction<IEvent | null>>;
	children?: ReactNode;
	deleteEventHandler?: (eventId: string) => void;
}

export default function EventForm({
	eventData,
	setData,
	children,
	deleteEventHandler
}: EventFormProps) {
	const [showMap, setShowMap] = useState(false);
	const [fileName, setFileName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const isEdit = !!eventData;

	const eventStartingDate = new Date(eventData?.startingDate);
	const isPastEvent = isPastDate(eventStartingDate);

	const form = useForm<z.infer<typeof EventFormSchema>>({
		resolver: zodResolver(EventFormSchema),
		defaultValues: getDefaultFormValues(),
	});

	const updateLocation = useCallback(
		(position: google.maps.LatLngLiteral) => {
			form.setValue("location.position", position);
			form.clearErrors("location.position");
		},
		[form]
	);

	const onFileButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleImageChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleFileChange(event, form, setFileName);
		},
		[form, setFileName]
	);

	const handleDeleteEvent = async (eventId: string) => {
		const userConfirmed = window.confirm(
			getTranslation("modalForm.confirmDeleteMessage")
		);

		if (!userConfirmed) {
			return;
		}

		setIsLoading(true);
		const response = await deleteEventById(eventId);
		setIsLoading(false);

		if (response instanceof AppError) {
			const errorMessage = handleError(response);
			toast({ description: errorMessage });
		} else {
			toast({
				description: getTranslation(
					"landingPage.messages.deleteEventSuccess"
				),
			});

			if (deleteEventHandler) {
				deleteEventHandler(eventId);
			}

			setDialogOpen(false);
		}
	};

	const resetForm = () => {
		form.reset(getDefaultFormValues(eventData));
		form.clearErrors();
		setShowMap(false);
		setFileName("");
	};

	const onSubmit = async (values: z.infer<typeof EventFormSchema>) => {
		setIsLoading(true);
		const apiCall = isEdit ? updateEvent : createEvent;
		const response = await apiCall(values, eventData?._id);

		if (response instanceof AppError) {
			const errorMessage = handleError(response);
			toast({ description: errorMessage });
		} else {
			const successMessage = isEdit
				? getTranslation("modalForm.responseMessages.editEventSuccess")
				: getTranslation("modalForm.responseMessages.createEventSuccess");
			toast({ description: successMessage });

			const setDataHandler: any = isEdit ? changeEvent : addNewEvent;
			setData && setData((prevData: IEvent[] | IEvent | null) => setDataHandler(prevData, response));

			setDialogOpen(false);
		}

		setIsLoading(false);
	};

	return (
		<>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild onClick={resetForm}>
					{children}
				</DialogTrigger>
				<DialogContent className="border-[#C9942A] border-2 max-w-[50em] max-h-[55em] md:max-h-[45em] overflow-y-auto">
					<DialogHeader className="mb-8 sm:text-center">
						<DialogTitle data-testid={"event-form-title"}>
							{isEdit
								? getTranslation("modalForm.editEvent")
								: getTranslation("modalForm.createEvent")}
						</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							data-testid={"event-form"}
							onSubmit={form.handleSubmit(onSubmit)}
							className="gap-2 grid grid-cols-5 md:mr-[3em] md:ml-[3em] min-w-[15em]"
						>
							<FormFieldComponent
								id="event-form-titleField"
								form={form}
								nameForm="name"
								label={titleLabelWithUpperLetter}
								fieldType="input"
								placeholder={titleLabelWithUpperLetter}
								itemClass="col-start-1 col-span-5 md:grid md:grid-cols-5 items-center"
								errorClass="col-start-1 md:col-span-2"
								fieldClass=" md:col-span-4"
							/>

							<FormFieldComponent
								id="event-form-dateField"
								form={form}
								nameForm="startingDate"
								label={dateLabelWithUpperLetter}
								fieldType="datePicker"
								placeholder={getTranslation("modalForm.placeholderDate")}
								itemClass="col-start-1 col-span-2 md:grid md:grid-cols-2 justify-evenly flex flex-col md:items-center"
								errorClass="col-start-1 col-span-2"
							/>

							<FormFieldComponent
								id="event-form-timeField"
								form={form}
								nameForm="startingTime"
								label={timeLabelWithUpperLetter}
								fieldType="input"
								placeholder={getTranslation("modalForm.placeholderTime")}
								itemClass=" col-start-4 col-span-2 md:grid md:grid-cols-2 items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="col-start-2 w-full "
							/>
							<FormFieldComponent
								id="event-form-locationField"
								form={form}
								nameForm="location.name"
								label={locationLabelWithUpperLetter}
								fieldType="input"
								placeholder={getTranslation("modalForm.placeholderLocation")}
								itemClass="col-start-1 col-span-3 md:col-span-4 md:grid md:grid-cols-4 md:items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="col-start-2 col-span-4 w-[95%]"
							/>

							<FormFieldComponent
								id="event-form-coordinateButton"
								form={form}
								nameForm="location.position"
								fieldType="button"
								placeholder={getTranslation("modalForm.locationButton")}
								itemClass="col-start-4 col-span-2 md:col-start-5 md:col-span-1 grid md:grid-cols-1 items-end"
								errorClass="col-start-1 col-span-1"
								fieldClass="w-[full] bg-[#C9942A]"
								onClick={() => setShowMap(true)}
								type="button"
							/>

							<FormFieldComponent
								id="event-form-ageGroupField"
								form={form}
								nameForm="ageGroup"
								label={ageGroupLabelWithUpperLetter}
								fieldType="input"
								placeholder={getTranslation("modalForm.placeholderAgeGroup")}
								itemClass="col-start-1 col-span-3 md:col-span-2 md:grid md:grid-cols-2 items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="col-start-2"
							/>

							<FormFieldComponent
								id="event-form-organizerField"
								form={form}
								nameForm="organizerName"
								label={organizerLabelWithUpperLetter}
								fieldType="input"
								placeholder={organizerLabelWithUpperLetter}
								itemClass="col-start-1 col-span-5 md:grid md:grid-cols-5 items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="col-start-2 col-span-4"
							/>

							<FormFieldComponent
								id="event-form-shortDescriptionField"
								form={form}
								nameForm="shortDescription"
								label={shortDescriptionWithUpperLetter}
								fieldType="textarea"
								placeholder={shortDescriptionWithUpperLetter}
								itemClass="col-start-1 col-span-5 md:grid md:grid-cols-5 items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="col-start-2  md:col-span-4 resize-none h-[5em]"
							/>

							<FormFieldComponent
								id="event-form-imageField"
								form={form}
								nameForm="imageUri"
								label={getTranslation("modalForm.upload")}
								fieldType="file"
								placeholder={getTranslation("modalForm.uploadButton")}
								itemClass="col-start-1 col-span-3 md:grid md:grid-cols-3 items-center"
								errorClass="col-start-1 col-span-2"
								fieldClass="md:col-start-2 col-span-2 w-[15em] bg-[#C9942A]"
								onClick={onFileButtonClick}
								fileInputRef={fileInputRef}
								accept={ACCEPTED_TYPES}
								onChange={handleImageChange}
								type="button"
							/>

							{(
								<FormLabel
									className="flex items-center col-span-2 col-start-4  max-w-full text-black"
									data-testid="event-form-imageName">
									{fileName ? fileName : getTranslation("modalForm.sizeImageRecommendationMessage")}
								</FormLabel>
							)}

							<FormFieldComponent
								id="event-form-descriptionField"
								form={form}
								nameForm="description"
								label={descriptionWithUpperLetter}
								fieldType="textarea"
								placeholder={descriptionWithUpperLetter}
								itemClass="col-start-1 col-span-5  md:grid  md:grid-cols-5 items-center"
								errorClass="col-start-1 col-span-4"
								fieldClass="col-start-2  md:col-span-4 resize-none h-[8em]"
							/>

							<FormActions
								isEdit={isEdit}
								isLoading={isLoading}
								isPastEvent={isPastEvent}
								handleDelete={handleDeleteEvent}
								eventId={eventData?._id}
							/>
						</form>
					</Form>
					{showMap && (
						<div data-testid={"event-form-map"} className="z-50 absolute bg-black bg-opacity-50 w-full h-[55em] md:h-[45em]">
							<EventCreateMap
								centerToBe={form.getValues("location.position")}
								updateLocation={updateLocation}
								setShowMap={setShowMap}
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}