import { timeElapsedMessageForDays, timeElapsedMessageForHours, timeElapsedMessageForMinutes } from "@/constants/commonFormMessages";
import getTranslation from "./transtationUtil.js";

export const formatDate = (date: Date) =>
	new Date(date).toLocaleDateString("en-GB").split("/").reverse().join("-");

export const formatTimeElapsed = (date: Date) => {
	const now = new Date();
	const createdDate = new Date(date);
	const seconds = Math.round((now.getTime() - createdDate.getTime()) / 1000);
	const minutes = Math.round(seconds / 60);
	const hours = Math.round(minutes / 60);
	const days = Math.round(hours / 24);

	if (days > 0) {
		return timeElapsedMessageForDays(days);
	}
	if (hours > 0) {
		return timeElapsedMessageForHours(hours);
	}
	if (minutes > 0) {
		return timeElapsedMessageForMinutes(minutes);
	}
	return getTranslation("eventDetailsPage.timeElapsedMessageForSecons");
};