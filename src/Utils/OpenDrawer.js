import { DrawerActions,createNavigationContainerRef  } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function openDrawer(routeName, params) {
    if (navigationRef.isReady()) {
        navigationRef.current.dispatch(DrawerActions.openDrawer());
    }
}