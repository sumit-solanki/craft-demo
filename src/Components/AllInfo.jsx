import React, { useEffect, useContext } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { AppContext } from "../Context/AppContext";

const AllInfo = (props) => {
  let navigate = useNavigate();
  const { buildingDetailsList, getBuildings, isDataLoading } =
    useContext(AppContext);
  useEffect(() => {
    if (!isDataLoading) {
      getBuildings();
    }
  }, []);

  const totalBuilding = buildingDetailsList.length;
  const totalRooms = buildingDetailsList.reduce((acc, item) => {
    return (acc += item.meetingRooms.length);
  }, 0);

  const allMeetings = buildingDetailsList.reduce((acc, building) => {
    acc.push(
      ...building.meetingRooms.reduce((acc, meetingRoom) => {
        acc.push(...meetingRoom.meetings);
        return acc;
      }, [])
    );
    return acc;
  }, []);

  const freeMeetingRooms = buildingDetailsList.reduce((acc, building) => {
    acc += building.meetingRooms.reduce((acc, meetingRoom) => {
      if (meetingRoom.meetings.length === 0) {
        acc++;
      }
      return acc;
    }, 0);
    return acc;
  }, 0);

  const onGoingMeetings = allMeetings.reduce((acc, meeting) => {
    const now = Date.now();

    const splitDate = meeting.date.split("/").reverse();
    splitDate[1]--;
    const splitStartTime = meeting.startTime.split(":");
    const splitEndTime = meeting.endTime.split(":");

    const startTimestamp = new Date(...splitDate, ...splitStartTime);
    const endTimestamp = new Date(...splitDate, ...splitEndTime);

    if (startTimestamp <= now && endTimestamp > now) {
      acc.push(meeting);
    }

    return acc;
  }, []);

  return (
    <div className="wrapper">
      <div className="component-wrapper building-wrapper">
        <div className="title-head">Welcome! </div>
        <div className="meeting detail-wrapper">
          <div className="block-wrapper">
            <div className="single-block">
              <div className="block-head">Building</div>
              <div className="block-details">
                Total <span className="value">{totalBuilding}</span>
              </div>
            </div>
            <div className="single-block">
              <div className="block-head">Rooms</div>
              <div className="block-details">
                Total <span className="value">{totalRooms}</span>
                Free now <span className="value">{freeMeetingRooms}</span>
              </div>
            </div>
            <div className="single-block">
              <div className="block-head">Meetings</div>
              <div className="block-details">
                Total <span className="value">{allMeetings.length}</span>
                On Going <span className="value">{onGoingMeetings.length}</span>
              </div>
            </div>
          </div>
          <div className="btn-block">
            <button className="btn" onClick={() => navigate(`/add-a-meeting`)}>
              Add A Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllInfo;
