import { useHistory } from "react-router-dom";
import { ImageTab } from "./ImageTab";

export const GardenTab = () => {

    const history = useHistory();


    if (history.location.pathname === "/handover") {
        return (
            <ImageTab imageUri="./images/Handover board view.jpg" />
        );
    }
    if (history.location.pathname === "/heat-trace") {
        return (
            <ImageTab imageUri="./images/Heat trace Board view.jpg" />
        );
    }
    return (
        <>hello</>
        // <Garden garden={garden} />
    );
}