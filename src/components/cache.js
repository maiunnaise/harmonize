import { getAPI } from '../components/fetchAPI';

export default async function manageCache(params, time, setData, fetch) {
    const now = new Date();

    let dataStorage = sessionStorage.getItem(params);

    dataStorage = dataStorage ? JSON.parse(dataStorage) : null;

    if ( dataStorage && dataStorage.cacheTime && now.getTime() - dataStorage.cacheTime < time * 1000) {
        setData(dataStorage.data);
    } 
    else {
        await getAPI(fetch, (data) => {
            setData(data);
            sessionStorage.setItem(params, JSON.stringify({ data, cacheTime: now.getTime() }));
        });
    }
}
