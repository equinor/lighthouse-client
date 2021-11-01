import { useFilteredData } from "../../../Filter";
import { Garden } from "../../../Garden";
import { useDataContext } from "../Context/DataProvider";





export const GardenTab = () => {
    const data = useFilteredData()
    const { gardenOptions } = useDataContext();

    return (
        gardenOptions ? <Garden data={data} groupeKey={gardenOptions.groupeKey} itemKey={gardenOptions.itemKey} /> : <p> No options provided.</p>
    );
}