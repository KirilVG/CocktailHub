import { ErrorMessage, ErrorType } from "@/constants/errorMessages";
import { AppError } from "@/lib/errorHandler";
import { deleteAllCookies } from "@/utils/cookieUtil";
import axios, { HttpStatusCode } from "axios";

type RegisterFormValues = {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
};

type LoginFormValues = {
  email?: string;
  password?: string;
};

const gycApi = process.env.VITE_GYC_API_URL;

export async function registerUser(values: RegisterFormValues) {
  return makeAuthenticatedRequest('post', '/register', values);
}

export async function loginUser(values: LoginFormValues) {
  return makeAuthenticatedRequest('post', '/login', values);
}

export async function logout() {
  return makeAuthenticatedRequest('post', '/logout');
}

export async function getAllUsers() {
  return makeAuthenticatedRequest('get', '/users');
}

export async function getUserById(userId: string) {
  return makeAuthenticatedRequest('get', `/users/${userId}`);
}

export async function updateUserRole(userId: string, role: string) {
  return makeAuthenticatedRequest('patch', `/users/changerole/${userId}`, { role });
}

export async function deleteUser(userId: string) {
  return makeAuthenticatedRequest('delete', `/users/${userId}`);
}

async function makeAuthenticatedRequest(method: string, url: string, data?: unknown) {
  try {
    const response = await axios({
      method,
      url: `${gycApi}${url}`,
      data,
      withCredentials: true
    });

    if (url === "/logout" && response.status === HttpStatusCode.Ok) {
      deleteAllCookies();
    }

    return response.data;
  } catch (error) {
    const mappedError = errorMap.get(url);
    const customError = mappedError
      ? new AppError(mappedError.message, mappedError.type)
      : new AppError(ErrorMessage.UnknownError, ErrorType.UnknownError);

    return customError;
  }
}

const errorMap: Map<string | undefined, { message: string, type: ErrorType }> = new Map([
  ["/register", { message: ErrorMessage.BadRequestError, type: ErrorType.RegisterError }],
  ["/login", { message: ErrorMessage.UnauthorizedError, type: ErrorType.LoginError }],
  [undefined, { message: ErrorMessage.UnknownError, type: ErrorType.UnknownError }]
]);