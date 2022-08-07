import React, { useEffect, useContext, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import services from "../Services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToasterDisplayTime = 2000;
const BuildList = (props) => {
  const [selectedBuildingInfo, setSelectedBuildingInfo] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [meetingId, setMeetingRoomId] = useState(0);

  const location = useLocation();
  const { buildingDetailsList } = useContext(AppContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (location.state.selectedDate === "" || buildingDetailsList.length < 1) {
      navigate("/add-a-meeting");
    } else {
      const filterBuilding = buildingDetailsList.filter(
        (item) => item.id === location.state.selectedOption.id
      );
      setSelectedBuildingInfo(filterBuilding);
    }
  }, []);

  const bookMeeting = async () => {
    const params = {
      query: `mutation {
      Meeting(
        id: ${meetingId}
        title: "${location.state.title}"
        date: "${location.state.selectedDate.split("-").reverse().join("/")}"
        startTime: "${location.state.selectedStartTime}"
        endTime: "${location.state.selectedEndTime}"
        meetingRoomId: ${selectedRoomId}
      ) {
        id
        title
      }
    }`,
    };
    try {
      const res = await services.bookMeeting(params);
      await toast.success("Meeting Added!", {
        position: "top-center",
        autoClose: ToasterDisplayTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate(`/`), ToasterDisplayTime);
    } catch (error) {
      console.log(error);
    }
  };

  const isAlreadyBooked = (data) => {
    const isBooked = data.meetings.some((meeting) => {
      const selectedDate = location.state.selectedDate.split("-");
      selectedDate[1]--;
      const selectedStartTime = location.state.selectedStartTime.split(":");
      const selectedEndTime = location.state.selectedEndTime.split(":");
      const splitDate = meeting.date.split("/").reverse();
      splitDate[1]--;
      const splitStartTime = meeting.startTime.split(":");
      const splitEndTime = meeting.endTime.split(":");
      const selectedStartTimestamp = new Date(
        ...selectedDate,
        ...selectedStartTime
      ).getTime();
      const selectedEndTimestamp = new Date(
        ...selectedDate,
        ...selectedEndTime
      ).getTime();
      const startTimestamp = new Date(
        ...splitDate,
        ...splitStartTime
      ).getTime();
      const endTimestamp = new Date(...splitDate, ...splitEndTime).getTime();

      if (
        (startTimestamp <= selectedStartTimestamp &&
          endTimestamp > selectedStartTimestamp) ||
        (startTimestamp <= selectedEndTimestamp &&
          endTimestamp > selectedEndTimestamp)
      ) {
        return true;
      }
      return false;
    });
    return isBooked;
  };

  const showAvailableList = () => {
    let roomHtml = [];
    roomHtml = selectedBuildingInfo[0]?.meetingRooms.map((item) => {
      let isRoomBooked = false;
      if (item.meetings.length > 0) {
        isRoomBooked = isAlreadyBooked(item);
      }
      if (isRoomBooked) {
        return null;
      }
      return (
        <div
          className={`single-list ${
            selectedRoomId === item.id ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedRoomId(item.id);
            setMeetingRoomId(item.meetings.length + 1);
          }}
        >
          <div className="title-name">{item.name}</div>
          <div className="desc-details">
            <span>{selectedBuildingInfo[0].name}, </span>
            <span>Floor {item.floor}</span>
          </div>
        </div>
      );
    });
    if (roomHtml && roomHtml.length > 0 && roomHtml[0] !== null)
      return roomHtml;
    return " No Room Availbale in seleted time";
  };
  return (
    <div className="wrapper">
      <div className="component-wrapper building-list-wrapper">
        <div className="title-head">Please select the free Rooms</div>
        <div className="list-container">
          <div className="block-wrapper">{showAvailableList()}</div>
          <div className="btn-block">
            <button
              disabled={selectedRoomId === 0}
              className="btn"
              onClick={() => bookMeeting()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default BuildList;
