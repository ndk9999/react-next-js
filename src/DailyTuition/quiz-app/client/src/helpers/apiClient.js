import axios from "axios";

export async function getDataFromServer(url, callback) {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

export async function postDataToServer(url, payload, callback) {
    const data = await (await axios.post(url, payload))?.data;
    return callback ? callback(data) : data;
}