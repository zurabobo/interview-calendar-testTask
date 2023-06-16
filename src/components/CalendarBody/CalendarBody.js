import styled from "styled-components";
import { format } from "date-fns";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
`;

const TableRow = styled.tr`
  td.hasEvent {
    background-color: #e6e6ff;
    padding: 2px;
    outline: solid 1px white;
    outline-offset: -2px;
    cursor: pointer;
  }
  td.hasEvent.active {
    background-color: #a4a5ff;
    background-size: cover;
    pointer-events: none;
  }
`;

const TableCell = styled.td`
  border: 1px solid #e6e6e6;
  min-height: 32px;
  max-height: 54px;
  width: 42px;
  box-sizing: border-box;

  &:nth-of-type(1) {
    border: none;
    text-align: center;
    vertical-align: bottom;
  }

  &:nth-of-type(2) {
    border-left: none;
  }

  padding: 0;
  font-size: 11px;
  color: #c0c0c0;
  @media (min-width: 510px) {
    width: 74px;
    height: 58px;
  }
`;

const CalendarBody = ({ hours, currentWeek, events, onDelete, toDelete }) => {
  return (
    <Table>
      <tbody>
        {hours.map((hour) => (
          <TableRow key={hour}>
            <TableCell>{format(hour, "HH:mm")}</TableCell>
            {currentWeek.map((day) => {
              const event = events.find(
                (e) =>
                  e.time === format(new Date(hour), "HH:mm") &&
                  format(day, "yyyy-MM-dd") ===
                    format(new Date(e.date), "yyyy-MM-dd")
              );

              return (
                <TableCell
                  key={day}
                  data-event-id={event && event.id}
                  className={`${event ? "hasEvent" : ""} ${
                    event && event.id === toDelete ? "active" : ""
                  }`}
                  onClick={() => onDelete(event && event.id)}
                ></TableCell>
              );
            })}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
export default CalendarBody;
