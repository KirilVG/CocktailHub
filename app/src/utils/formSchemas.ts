import { z } from "zod";
import {
    emailRegex,
    passwordRegex,
    usernameRegex,
    eventTimeRegex,
} from "../../../shared/utils/regexPatterns";

import {
    invalidEmailMessage,
    minLengthMessage,
    requiredEmailMessage,
    invalidUsernameMessage,
    requiredTitleMessage,
    requiredDateMessage,
    requiredOrganizerMessage,
    requiredShortDescriptionMessage,
    requiredTimeMessage,
    requiredImageMessage,
    requiredCoordinatesMessage,
    invalidPasswordMessage,
    invalidConfirmPasswordMessage,
    invalidPasswordFormatMessage,
    maxLength100Message,
    maxLength1600Message,
    maxLength500Message,
    maxLength30Message,
    invalidTime,
    requiredLocationMessage,
} from "@/constants/commonFormMessages";

export type RegisterFormValues = {
    email?: string | undefined;
    password?: string | undefined;
    username?: string | undefined;
    confirmPassword?: string | undefined;
} | undefined;

export const RegisterFormSchema = z
    .object({
        email: z
            .string()
            .min(2, {
                message: requiredEmailMessage,
            })
            .regex(emailRegex, {
                message: invalidEmailMessage,
            }),
        username: z.string().min(5, {
            message: minLengthMessage,
        }).regex(usernameRegex, {
            message: invalidUsernameMessage,
        }),
        password: z.string().regex(passwordRegex, {
            message: invalidPasswordFormatMessage,
        }),
        confirmPassword: z.string(),
    })
    .refine(
        (values: RegisterFormValues) => {
            return values && values.password === values.confirmPassword;
        },
        {
            message: invalidConfirmPasswordMessage,
            path: ["confirmPassword"],
        }
    );

export const LoginFormSchema = z.object({
	email: z
		.string()
		.min(2, {
			message: invalidEmailMessage,
		})
		.regex(emailRegex, {
			message: requiredEmailMessage,
		}),
	password: z.string().regex(passwordRegex, {
		message: invalidPasswordMessage,
	}),
});

export const EventFormSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: requiredTitleMessage,
        })
        .max(100, {
        message: maxLength100Message,
        }),
    startingDate: z
        .date({
            required_error: requiredDateMessage,
        }),
    startingTime: z
        .string()
        .min(1, {
            message: requiredTimeMessage,
        })
        .regex(eventTimeRegex, {
        message: invalidTime,
        }),
    ageGroup: z
        .string()
        .max(30, {
            message: maxLength30Message,
            })
        .optional(),
    organizerName: z
        .string()
        .min(1, {
            message: requiredOrganizerMessage,
        })
        .max(100, {
            message: maxLength100Message,
        }),
    shortDescription: z
        .string()
        .min(1, {
            message: requiredShortDescriptionMessage,
        })
        .max(500, {
            message: maxLength500Message,
        }),
    description: z
        .string()
        .max(1600, {
            message: maxLength1600Message,
        })
        .optional(),
    location: z.object({
        name: z.string()
                .min(1, {
                 message: requiredLocationMessage,
                })
                .max(100, {
                message: maxLength100Message,
                }) ,
        position: z.object(
            {
            lat: z.number(),
            lng: z.number(),
            }, {
                required_error: requiredCoordinatesMessage
            })
        }).required(),
    imageUri: z
        .string()
        .min(1, {
            message: requiredImageMessage,
           }),
});
