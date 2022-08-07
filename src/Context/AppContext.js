import { createContext } from 'react';
export const AppContext = createContext({
    buildingOptions: [],
    setBuildingOptions: (arg) => {},
    buildingDetailsList:[],
    setBuildingDetailsList:(arg) => {},
    getBuildings:()=>{},
    isDataLoading:false
});
