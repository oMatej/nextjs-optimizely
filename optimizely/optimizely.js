import { createInstance, enums } from '@optimizely/react-sdk';

let optimizely;

console.log('[optimizely] Am I used in browser?');

export const getOrInitializeOptimizely = ({ datafile, isBrowser }) => {
    if (!isBrowser) {
        console.log('[optimizely] created instance on server');
        return createInstance({ datafile, datafileOptions: { autoUpdate: false } });
    }


    if (!optimizely) {
        console.log('[optimizely] created instance on client');
        optimizely = createInstance({
            datafile,
            logLevel: enums.LOG_LEVEL.DEBUG,
        });
    }

    return optimizely;
};