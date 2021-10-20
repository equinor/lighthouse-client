import { useHistory } from "react-router";
import { ImageTab } from "./ImageTab";

export const TreeTab = () => {
    const history = useHistory();
    console.log(history.location.pathname)

    if (history.location.pathname === "/handover") {
        return (
            <ImageTab imageUri="./images/Handover tree view.jpg" />
        );
    }

    return (
        <ImageTab imageUri="./images/Handover tree view.jpg" />
        // <TreeRoot />
    );
}

