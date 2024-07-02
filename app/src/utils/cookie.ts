export function getCookieByName(name: string) {
    let result = "";

    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
        result = match[2];
    }

    return result;
}