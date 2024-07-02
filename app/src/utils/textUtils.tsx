export const capitalizeFirstLetter = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const makeWordPlural = (word: string): string => {
    const plurals: { [key: string]: string } = {
        'ден': 'дни',
        'час': 'часа',
        'минута': 'минути'
    };

    return plurals[word] || word;
}
