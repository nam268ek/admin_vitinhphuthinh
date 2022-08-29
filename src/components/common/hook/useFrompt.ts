import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useBlocker } from './useBlocker';

export function usePrompt(when: boolean): (boolean | any)[] {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState<boolean>(false);
    const [lastLocation, setLastLocation] = useState<any>(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState<boolean>(false);

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
    }, []);

    // handle blocking when user click on another route prompt will be shown
    const handleBlockedNavigation = useCallback(
        (nextLocation: any) => {
            // in if condition we are checking next location and current location are equals or not
            if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
                setShowPrompt(true);
                setLastLocation(nextLocation);
                return false;
            }
            return true;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [confirmedNavigation, location]
    );

    const confirmNavigation = useCallback(() => {
        setShowPrompt(false);
        setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            navigate(lastLocation.location.pathname);

            // Clean-up state on confirmed navigation
            setConfirmedNavigation(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation, confirmedNavigation];
}