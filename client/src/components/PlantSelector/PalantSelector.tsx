import { SingleSelect } from "@equinor/eds-core-react";
import usePlantSelector from "./usePlantSelector";

const PlantSelector = () => {
    const plants = usePlantSelector();
    return (

        <SingleSelect
            items={plants}
            label=""
            defaultValue="Select a plant."
        />

    )
}

export default PlantSelector;