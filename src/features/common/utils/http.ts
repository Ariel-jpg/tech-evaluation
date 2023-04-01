import settings from "../../../settings.json";
import PhotoType from "../Types/PhotoType";
const { BASE_URL, API_KEY } = settings;

export const getPhotoDay = (date: string) : Promise<PhotoType> => {
    const url = BASE_URL + "/apod?api_key=" + API_KEY + "&date=" + date;

    return fetch(url, { method: "GET" }).then(res => res.json())
}