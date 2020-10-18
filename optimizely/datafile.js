let datafile;

const SDK_KEY = 'YOUR_SDK_KEY';

const fetchDatafile = async () => {
    const res = await fetch(
        `https://cdn.optimizely.com/datafiles/${SDK_KEY}.json`,
        { method: 'get' }
    );

    if (res.ok) {
        datafile = await res.json();

        console.log('Downloaded datafile', datafile.revision);
    }

    if (!datafile) {
        return {};
    }

    return datafile;
};

/**
 * @returns {Promise<Object>}
 */
export const getDatafile = async () => {
    if (datafile) {
        fetchDatafile();

        return datafile;
    }

    return fetchDatafile();
};