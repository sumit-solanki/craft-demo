import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import services from "../Services/ApiServices";

const params = {
  query:`{
    Buildings {
      id
      name
      meetingRooms {
        name
        id
        floor
        meetings {
          id
          title
          date
          startTime
          endTime
        }
      }
    }
  }`
};

export const AppContextProvider = ({ children }) => {
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [buildingDetailsList, setBuildingDetailsList] = useState([]);
  const [isDataLoading, setDataLoading] = useState(false);

  const getBuildings = async () => {
    try {
      setDataLoading(true);
      const res = await services.getBuildings(params);
      setDataLoading(false);
      const buildingResponse = res.data.data;
      setBuildingDetailsList(buildingResponse.Buildings);
      const buildingOption = buildingResponse.Buildings.map((item) => {
        return { label: item.name, value: item.name, id: item.id };
      });
      setBuildingOptions(buildingOption);
    } catch (error) {
      setDataLoading(false);
      console.log({ error });
    }
  };

  useEffect(() => {
    getBuildings();
  }, []);

  const contextValue = {
    buildingOptions,
    setBuildingOptions,
    buildingDetailsList,
    buildingDetailsList,
    getBuildings,
    isDataLoading,
  };

  return (
    <AppContext.Provider value={{ ...contextValue }}>
      {children}
    </AppContext.Provider>
  );
};
