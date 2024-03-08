import axios from "axios";
import { API_URL } from "@env";

export const getLocation = async () => {
    const provinces = (await axios.get(API_URL + 'provinces')).data;
    const districts = (await axios.get(API_URL + 'districts')).data;
    const wards = (await axios.get(API_URL + 'wards')).data;
    return { provinces, districts, wards };
}