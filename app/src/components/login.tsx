import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldComponent from "./commonComponents/formField";
import { Form } from "./ui/form";
import getTranslation from "@/utils/transtationUtil";
import { emailLabelWithUpperLetter } from "@/constants/commonFormMessages";
import { LoginFormSchema } from "@/utils/formSchemas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { loginUser } from "@/api/userCalls";
import { withAuthRoute } from "@/routes/routesHandling";
import { AppError, handleError } from "@/lib/errorHandler";
import { COCKTAILS_PAGE, REGISTER_ROUTE } from "@/constants/routesConsts";

function Login() {
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
		setIsLoading(true);

		const response = await loginUser(values);

		if (response instanceof AppError) {
			const errorMessage = handleError(response);

			toast({ description: errorMessage })
		} else {
			toast({ description: getTranslation("form.responseMessages.loginSuccess") });

			navigate(COCKTAILS_PAGE);
		}

		setIsLoading(false);
	};

	return (
		<div className="space-y-8 w-4/5 md:w-3/5">
			<div className="space-y-2">
				<h2 className="font-medium text-lg leading-6">
					{getTranslation("form.login")}
				</h2>
			</div>
			<div className="space-y-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 grid touch-manipulation">
						<FormFieldComponent
							id="login-form-emailField"
							form={form}
							nameForm="email"
							label={emailLabelWithUpperLetter}
							placeholder={getTranslation(
								"form.placeholderEmail"
							)}
						/>
						<div className="space-y-2">
							<FormFieldComponent
								id="login-form-passwordField"
								form={form}
								nameForm="password"
								label={getTranslation("form.password")}
								type="password"
							/>
						</div>
						<div className="space-y-2" />
						<Button id="login-submitButton" className="bg-[#202738] w-full" type="submit" disabled={isLoading}>
							{getTranslation("form.login")}
						</Button>
					</form>
					<div className="space-y-5">
						<p className="w-full">
							{getTranslation("form.messageForRegistration")}
						</p>
						<Link
							id="login-linkToRegistration"
							className="w-full text-[#E27532]"
							to={REGISTER_ROUTE}
						>
							{getTranslation("form.createAccount")}
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
}

const AuthenticatedLogin = withAuthRoute(Login);

export default AuthenticatedLogin;