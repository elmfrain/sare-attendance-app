import dayjs from "../../node_modules/dayjs/esm";

export default function CalendarDayItem({date}) {
  var dateObj = dayjs(date);
  
  const dayItemStyle = {
    width: "6.5rem"
  };

  // If not date if provided, use a dummy date
  if(!date)
    dateObj = dayjs('2024-01-31');

  return (
    <div className="card box-shadow overflow-hidden" style={dayItemStyle}>
      <div className="card-header d-flex justify-content-center bg-primary fw-bold p-1 text-light">
        {dateObj.format("MMM")}
      </div>
      <div className="card-body d-flex flex-column align-items-center p-1 bg-light fw-bold text-dark">
        <h1>{dateObj.format("D")}<hr className="my-0"/></h1>
        {dateObj.format("ddd")}
      </div>
    </div>
  );
}