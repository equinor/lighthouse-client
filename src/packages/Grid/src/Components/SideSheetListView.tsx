import { Grid } from "./Grid";

export const SidesheetListView = ({data}) => {
    if(data && data.length > 0){
        return (
           <Grid data={data} />
    )
}
return null;
}