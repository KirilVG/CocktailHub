const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex: RegExp = /^[a-zA-Zа-яА-Я0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Zа-яА-Я0-9]){5,}[a-zA-Zа-яА-Я0-9]$/;
const passwordRegex: RegExp = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-zа-яА-Я\d!@#$%^&()*]{12,}$/;
const nameSurnameRegex: RegExp = /^[a-zA-Zа-яА-Я]+(?:[-' ][a-zA-Zа-яА-Я]+)*$/;

const eventNameRegex: RegExp = /^[a-zA-Zа-яА-Я0-9\s\/.,?'"-=+:_!@#$%^\\\[\]{}>|`~]+/;
const eventDescriptionRegex: RegExp = /^[a-zA-Zа-яА-Я0-9\s\/.,?'"-=+:_!@#$%^\\\[\]{}>|`~№€§\*]*/;
const eventTimeRegex: RegExp = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
const dateRegex: RegExp = /^(?!0000)(?!00)[-+]?\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])\.\d{3}Z$/;

export { 
    emailRegex, 
    usernameRegex, 
    passwordRegex, 
    nameSurnameRegex, 
    eventNameRegex, 
    eventDescriptionRegex,
    eventTimeRegex,
    dateRegex
}