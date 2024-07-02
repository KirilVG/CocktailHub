import getTranslation from "@/utils/transtationUtil";
import { capitalizeFirstLetter, makeWordPlural } from "@/utils/textUtils";

export const emailField = getTranslation("form.email");
export const nameField = getTranslation("form.name");
export const usernameField = getTranslation("form.username");
export const passwordField = getTranslation("form.password");
export const emailLabelWithUpperLetter = capitalizeFirstLetter(emailField);
export const nameLabelWithUpperLetter = capitalizeFirstLetter(usernameField);
export const passwordLabelWithUpperLetter = capitalizeFirstLetter(passwordField);
export const confirmPasswordField = getTranslation("form.confirmPassword");
export const requiredEmailMessage = getTranslation("form.validationMessages.required", { field: emailField });
export const invalidEmailMessage = getTranslation("form.validationMessages.invalid", { field: emailField });
export const invalidUsernameMessage = getTranslation("form.validationMessages.invalid", { field: nameLabelWithUpperLetter });
export const minLengthMessage = getTranslation("form.validationMessages.minLength", { field: nameLabelWithUpperLetter, min: 5 });
export const invalidPasswordMessage = getTranslation("form.validationMessages.invalid", { field: passwordLabelWithUpperLetter });
export const invalidPasswordFormatMessage = getTranslation("form.validationMessages.passwordFormatInvalid");
export const invalidConfirmPasswordMessage = getTranslation("form.validationMessages.invalid", { field: confirmPasswordField });

export const titleField = getTranslation("modalForm.title");
export const dateField = getTranslation("modalForm.date");
export const timeField = getTranslation("modalForm.time");
export const locationField = getTranslation("modalForm.location");
export const ageGroupField = getTranslation("modalForm.ageGroup");
export const organizerField = getTranslation("modalForm.organizer");
export const shortDescriptionField = getTranslation("modalForm.shortDescription");
export const descriptionField = getTranslation("modalForm.description");
export const imageField = getTranslation("modalForm.image");
export const coordinateField = getTranslation("modalForm.coordinate");

export const titleLabelWithUpperLetter = capitalizeFirstLetter(titleField);
export const dateLabelWithUpperLetter = capitalizeFirstLetter(dateField);
export const timeLabelWithUpperLetter = capitalizeFirstLetter(timeField);
export const locationLabelWithUpperLetter = capitalizeFirstLetter(locationField);
export const ageGroupLabelWithUpperLetter = capitalizeFirstLetter(ageGroupField);
export const organizerLabelWithUpperLetter = capitalizeFirstLetter(organizerField);
export const shortDescriptionWithUpperLetter = capitalizeFirstLetter(shortDescriptionField);
export const descriptionWithUpperLetter = capitalizeFirstLetter(descriptionField);

export const requiredTitleMessage = getTranslation("modalForm.massages.required", { field: titleField });
export const requiredDateMessage = getTranslation("modalForm.massages.required", { field: dateField });
export const requiredTimeMessage = getTranslation("modalForm.massages.required", { field: timeField });
export const requiredLocationMessage = getTranslation("modalForm.massages.required", { field: locationField });
export const requiredOrganizerMessage = getTranslation("modalForm.massages.required", { field: organizerField });
export const requiredShortDescriptionMessage = getTranslation("modalForm.massages.required", { field: shortDescriptionField });
export const requiredImageMessage = getTranslation("modalForm.massages.required", { field: imageField });
export const requiredCoordinatesMessage = getTranslation("modalForm.massages.required", { field: coordinateField });

export const maxLength30Message = getTranslation("modalForm.massages.maxLength", { max: 30 });
export const maxLength100Message = getTranslation("modalForm.massages.maxLength", { max: 100 });
export const maxLength500Message = getTranslation("modalForm.massages.maxLength", { max: 500 });
export const maxLength1600Message = getTranslation("modalForm.massages.maxLength", { max: 1600 });

export const invalidTime = getTranslation("modalForm.massages.invalidTimeForm");


const dayString = getTranslation("eventDetailsPage.day");
const hourString = getTranslation("eventDetailsPage.hour");
const minuteString = getTranslation("eventDetailsPage.minute");

export const timeElapsedMessageForDays = (days: number) =>
	getTranslation("eventDetailsPage.timeElapsedMessage", {field: days,string: days === 1 ? dayString : makeWordPlural(dayString)});
  
  export const timeElapsedMessageForHours = (hours: number) =>
	getTranslation("eventDetailsPage.timeElapsedMessage", {field: hours,string: hours === 1 ? hourString : makeWordPlural(hourString)});
  
  export const timeElapsedMessageForMinutes = (minutes: number) =>
	getTranslation("eventDetailsPage.timeElapsedMessage", {field: minutes,string: minutes === 1 ? minuteString : makeWordPlural(minuteString)});