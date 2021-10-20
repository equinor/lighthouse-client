import { useHistory } from "react-router-dom";
import { PowerBI } from "../../../../modules/powerBI";
import { ImageTab } from "./ImageTab";

export const AnalyticsTab = () => {
    const history = useHistory();

    if (history.location.pathname === "/heat-trace") {
        return (
            <ImageTab imageUri="./images/Heat trace analytics view.jpg" />
        );
    }
    return (
        <PowerBI />
    );
}
