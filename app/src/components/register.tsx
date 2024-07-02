import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "./ui/button";
import FormFieldComponent from "./commonComponents/formField";
import { Form } from "./ui/form";
import getTranslation from "@/utils/transtationUtil";
import {
	emailLabelWithUpperLetter,
	nameLabelWithUpperLetter,
} from "@/constants/commonFormMessages";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/userCalls";
import { RegisterFormSchema } from "@/utils/formSchemas";
import { withAuthRoute } from "@/routes/routesHandling";
import { AppError, handleError } from "@/lib/errorHandler";

function Register() {
	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
		setIsLoading(true);

		const response = await registerUser(values);

		if (response instanceof AppError) {
			const errorMessage = handleError(response);

			toast({ description: errorMessage })
		} else {
			toast({ description: getTranslation("form.responseMessages.registrationSuccess") });

			navigate('/');
		}

		setIsLoading(false);
	};

	return (
		<div className="space-y-8 w-4/5 md:w-3/5">
			<div className="space-y-2">
				<h2 className="font-medium text-lg leading-6">
					{getTranslation("form.signup")}
				</h2>
			</div>
			<div className="gap-2 grid">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 grid touch-manipulation">
						<FormFieldComponent
							id="registration-form-emailField"
							form={form}
							nameForm="email"
							label={emailLabelWithUpperLetter}
							placeholder={getTranslation(
								"form.placeholderEmail"
							)}
						/>
						<FormFieldComponent
							id="registration-form-usernameField"
							form={form}
							nameForm="username"
							label={nameLabelWithUpperLetter}
							placeholder={getTranslation("form.placeholderName")}
						/>
						<FormFieldComponent
							id="registration-form-passwordField"
							form={form}
							nameForm="password"
							label={getTranslation("form.password")}
							type="password"
						/>
						<FormFieldComponent
							id="registration-form-confirmPasswordField"
							form={form}
							nameForm="confirmPassword"
							label={getTranslation("form.confirmPassword")}
							type="password"
						/>
						<Button id="registration-form-submitButton" className="bg-[#202738] w-full" type="submit" disabled={isLoading}>
							{getTranslation("form.signup")}
						</Button>
					</form>
					<div className="space-y-5">
						<p className="w-full">
							{getTranslation("form.messageForLogin")}
						</p>
						<Link id="registration-linkToLogin" className="w-full text-[#E27532]" to={"/"}>
							{getTranslation("form.login")}
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
}

const AuthenticatedRegister = withAuthRoute(Register);

export default AuthenticatedRegister;