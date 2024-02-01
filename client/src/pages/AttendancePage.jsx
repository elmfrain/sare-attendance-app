import { useQuery } from "@apollo/client";
import AttendanceTable from "../components/AttendanceTable";
import MeetingItem from "../components/MeetingItem";
import { GET_ATTENDANCES, GET_LATEST_MEETING } from "../utils/queries";
import { useEffect } from "react";
import AttendForm from "../components/AttendForm";

export default function AttendancePage() {
  const { data: meetingData, loading: meetingLoading, refetch: refetchLatestMeeting } = useQuery(GET_LATEST_MEETING);
  const { data: attendanceData, loading: attendanceLoading, refetch: refetchAttendances } = useQuery(GET_ATTENDANCES);

  useEffect(() => {
    if(meetingData)
      refetchAttendances({ meeting: meetingData.latestMeeting._id });
  }, [meetingData]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className={`spinner-border ${ meetingLoading ? "" : "d-none"}`} />
      { meetingData ? <MeetingItem meeting={meetingData.latestMeeting} /> : null }
      < AttendForm refetch={refetchLatestMeeting}  meeting={ meetingData ? meetingData.latestMeeting._id : null } />
      <div className={`spinner-border ${ attendanceLoading ? "" : "d-none"}`} />
      { attendanceData ? <AttendanceTable attendances={attendanceData.attendances} refetch={refetchAttendances } /> : null }
    </div>
  );
}