import { ApiRoute } from "@/constants/apiConstants";
import { handleError } from "@/utils/apiCalls";
import { IBar } from "@@/types";
import axios from "axios";

export async function createBar(data: IBar) {
    try {
        const response = await axios.post(`${ApiRoute}/bars`, data, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function updateBar(data: IBar) {
    try {
        const response = await axios.patch(`${ApiRoute}/bars/${data._id}`, data, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getAllBars() {
    try {
        const response = await axios.get(`${ApiRoute}/bars`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBarById(id: string) {
    try {
        const response = await axios.get(`${ApiRoute}/bars/${id}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteBarById(id: string) {
    try {
        const response = await axios.delete(`${ApiRoute}/bars/${id}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}