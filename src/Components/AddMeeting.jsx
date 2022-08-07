import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Select from "react-select";
import { AppContext } from "../Context/AppContext";

const AddMeeting = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [title, setTitle] = useState("");

  const { buildingOptions, setBuildingOptions } = useContext(AppContext);

  let navigate = useNavigate();

  useEffect(() => {
    setSelectedOption(buildingOptions[0]);
  }, [buildingOptions]);

  const onSelectBuildingOption = (e) => {
    setSelectedOption(e);
  };
  const handleSubmit = () => {
    navigate(`/select-building`, {
      state: {
        title,
        selectedDate,
        selectedEndTime,
        selectedStartTime,
        selectedOption,
      },
    });
  };

  return (
    <div className="wrapper">
      <div className="component-wrapper add-meeting-wrapper">
        <div className="title-head">Add Meeting</div>
        <form onSubmit={handleSubmit} className="form detail-wrapper">
          <div className="block-wrapper">
            <div className="single-row">
              <div className="left">Title</div>
              <div className="right">
                <input
                  type={"text"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="single-row">
              <div className="left">Date*</div>
              <div className="right">
                <input
                  type={"date"}
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="single-row inline-row">
              <div>
                <div className="left">Start time*</div>
                <div className="right">
                  <input
                    type={"time"}
                    pattern="[0-9]{2}:[0-9]{2}"
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="left">End time*</div>
                <div className="right">
                  <input
                    type={"time"}
                    value={selectedEndTime}
                    onChange={(e) => setSelectedEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="single-row">
              <div className="left">Select Building</div>
              <div className="right">
                <Select
                  options={buildingOptions}
                  onChange={(e) => onSelectBuildingOption(e)}
                  value={selectedOption}
                  placeholder="Select an option"
                  defaultValue={buildingOptions[0]}
                />
              </div>
            </div>
          </div>
          <div className="btn-block">
            <input type={"submit"} className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddMeeting;
