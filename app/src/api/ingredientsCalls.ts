import { ApiRoute } from "@/constants/apiConstants";
import { handleError } from "@/utils/apiCalls";
import { IIngredient } from "@@/types";
import axios from "axios";

export async function createIngredient(data: IIngredient) {
    try {
        const response = await axios.post(`${ApiRoute}/ingredients`, data, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function updateIngredient(data: IIngredient) {
    try {
        const response = await axios.patch(`${ApiRoute}/ingredients/${data._id}`, data, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getAllIngredients() {
    try {
        const response = await axios.get(`${ApiRoute}/ingredients`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getIngredientById(id: string) {
    try {
        const response = await axios.get(`${ApiRoute}/ingredients/${id}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteIngredientById(id: string) {
    try {
        const response = await axios.delete(`${ApiRoute}/ingredients/${id}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}