import history from "./history.service";

export default {
    pathMatcher: (path) => {
        const currentLocation = window.location.pathname;

        const regEx = new RegExp(`^${path}$`)

        if (regEx.test(currentLocation)) {
            return true;
        }
    }
}