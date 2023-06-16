import styled from "styled-components";
import {
  format,
  add,
  addWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isEqual,
} from "date-fns";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin: 0 auto;
  width: 87%;
`;

const FixedHeader = styled.div`
  background-color: #fff;
  position: sticky;
  top: 0;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-areas:
    "a a a a a a a"
    "b b b b b b b";
  grid-template-columns: repeat(7, 1fr);
  place-items: end;
  background-color: #f6f6f6;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 0 8px;
`;

const WeekContainer = styled.div`
  display: flex;
  grid-area: a;
  width: 87%;
  justify-content: space-around;
`;

const Week = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: black;
    text-align: center;
    cursor: pointer;
  }

  span:first-of-type {
    font-size: 8px;
    padding: 7px 0 4px;
  }

  span:last-of-type {
    font-size: 13px;
    box-sizing: content-box;
    padding: 5px;
    width: 15px;
    height: 15px;
    line-height: 1.2;
  }

  &.current span:last-of-type {
    border-radius: 50%;
    background-color: #a6a6a7;
    color: white;
  }

  &.today span:last-of-type {
    color: red;
  }

  &.today.current span:last-of-type {
    color: white;
    background-color: #fe4141;
    border-radius: 50%;
  }
`;

const YearSpan = styled.span`
  font-size: 12px;
  line-height: 1.6;
  grid-area: a;
`;

const WeekControls = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 87%;
  padding: 5px 0 0;
  grid-area: b;
  place-items: center;
  grid-template-areas: "b a a a a a c";
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
`;

const ControlButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  color: #f41627;
  padding: 0 16px;
  font-weight: 300;
  &:nth-of-type(1) {
    grid-area: b;
  }
  &:nth-of-type(2) {
    grid-area: c;
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  font-weight: 300;
  color: #f41627;
  padding: 0;
`;
const CalendarHeader = ({
  today,
  currentWeek,
  setCurrentWeek,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  setToDelete,
  onAddEvent,
}) => {

  const handlePrevWeek = () => {
    setCurrentWeek(
      eachDayOfInterval({
        start: startOfWeek(add(currentWeek[0], { weeks: -1 }), {
          weekStartsOn: 1,
        }),
        end: endOfWeek(add(currentWeek[0], { weeks: -1 }), { weekStartsOn: 1 }),
      })
    );
    setCurrentDate((prevDate) => addWeeks(prevDate, -1));
    setToDelete("");
  };

  const handleNextWeek = () => {
    setCurrentWeek(
      eachDayOfInterval({
        start: startOfWeek(add(currentWeek[0], { weeks: 1 }), {
          weekStartsOn: 1,
        }),
        end: endOfWeek(add(currentWeek[0], { weeks: 1 }), { weekStartsOn: 1 }),
      })
    );
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));

    setToDelete("");
  };
  return (
    <FixedHeader>
      <Header>
        <Title>Interview Calendar</Title>
        <AddButton onClick={onAddEvent}>+</AddButton>
      </Header>
      <HeaderContainer>
        <WeekContainer>
          {currentWeek.map((dayOfWeek) => (
            <Week
              key={dayOfWeek}
              onClick={() => {
                setSelectedDate(dayOfWeek);
                setCurrentDate(dayOfWeek);
                setToDelete("");
              }}
              className={`${isEqual(dayOfWeek, today) ? "today" : ""} ${
                isEqual(dayOfWeek, selectedDate) ? "current" : ""
              }`}
            >
              <span>{format(dayOfWeek, "EEEEE")}</span>
              <span>{format(dayOfWeek, "d")}</span>
            </Week>
          ))}
        </WeekContainer>

        <WeekControls>
          <ControlButton onClick={handlePrevWeek}>&lt;</ControlButton>
          <YearSpan>
            {format(currentDate, "MMMM yyyy", {
              awareOfUnicodeTokens: true,
            })}
          </YearSpan>
          <ControlButton onClick={handleNextWeek}>&gt;</ControlButton>
        </WeekControls>
      </HeaderContainer>
    </FixedHeader>
  );
};
export default CalendarHeader;
