export default function RankTag({rank, showName}) {
  var tagName = "Unknown";
  var variation = "secondary";
  var icon = "question";
  var iconColor = "#212529";
  var textColor = "#212529";

  switch(rank) {
    case "president":
      tagName = "President";
      variation = "danger";
      icon = "crown";
      iconColor = "#800000";
      textColor = "white";
      break;
    case "executive":
      tagName = "Executive";
      variation = "warning";
      icon = "gears";
      iconColor = "#663300";
      textColor = "#4d2600";
      break;
    case "active-member":
      tagName = "Active Member";
      variation = "success";
      icon = "award";
      iconColor = "#66ff33";
      textColor = "white"
      break;
    case "member":
      tagName = "Member";
      variation = "primary";
      icon = "user";
      iconColor = "#000099";
      textColor = "white";
  }

  const iconStyle = {
    color: iconColor
  }

  const tagStyle = {
    transform: "translate(0,-2px)",
    color: textColor
  }

  return (
    !showName ? <span style={tagStyle} className={`badge bg-${variation} rounded-circle p-2_5`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={tagName}>
      <i className={`fa fa-${icon} center-icon`} style={iconStyle}></i>
    </span> :
    <span style={tagStyle} className={`badge bg-${variation} rounded-pill`}>
      <i className={`fa fa-${icon}`} style={iconStyle}></i> {tagName}
    </span>
  );
}