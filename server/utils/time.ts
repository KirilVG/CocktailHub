export function getDateBefore(days: number): Date {
    let date = new Date();
    date.setDate(date.getDate() - days);

    return date;
}

export function getTimeStamp(date: Date, time: string): number {
    const [hours, minutes] = time.split(':').map(Number);

    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    return dateTime.getTime();
}

export function getDateNow() {
    return Date.now();
}

export function getLocalTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}