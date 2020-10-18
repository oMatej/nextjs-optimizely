import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { OptimizelyProvider} from '@optimizely/react-sdk';

import { getOrInitializeOptimizely } from './optimizely';

const isBrowser = typeof window !== 'undefined';

export const withOptimizelyProvider = PageComponent => {
    const WithOptimizely = ({ datafile, id, ...props }) => {
        const { query } = useRouter();

        const optimizely = getOrInitializeOptimizely({ datafile, isBrowser });

        console.log('isReady', optimizely.isReady()); // This return false on client-side.

        const user = useMemo(() => ({
            id,
            attributes: query
        }), [id, query]);

        return (
            <OptimizelyProvider
                optimizely={optimizely}
                user={user}
                isServerSide={!isBrowser}
            >
                <PageComponent {...props} />
            </OptimizelyProvider>
        );
    };

    WithOptimizely.defaultProps = {
        datafile: {}
    };

    WithOptimizely.getInitialProps = PageComponent.getInitialProps;

    if (process.env.NODE_ENV !== 'production') {
        // Set the correct displayName in development
        WithOptimizely.displayName = `withOptimizely(${PageComponent.name})`;
    }

    return WithOptimizely;
};
