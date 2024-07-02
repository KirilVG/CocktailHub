import { handleError } from '@/utils/apiCalls';
import { ICocktail } from "@@/types";
import axios from "axios";
import { ApiRoute } from '../constants/apiConstants';

export async function createCocktail(cocktailData: ICocktail) {
    try {
        const response = await axios.post(`${ApiRoute}/cocktails`, cocktailData, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function updateCocktail(cocktailData: ICocktail) {
    try {
        const response = await axios.patch(`${ApiRoute}/cocktails/${cocktailData._id}`, cocktailData, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getAllCocktails() {
    try {
        const response = await axios.get(`${ApiRoute}/cocktails`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getCocktailById(cocktailId: string) {
    try {
        const response = await axios.get(`${ApiRoute}/cocktails/${cocktailId}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteCocktailById(cocktailId: string) {
    try {
        const response = await axios.delete(`${ApiRoute}/cocktails/${cocktailId}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}