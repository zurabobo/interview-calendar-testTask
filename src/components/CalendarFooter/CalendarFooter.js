import styled from "styled-components";

const ToTodayBtn = styled.button`
  color: #f41627;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

const DeleteButton = styled(ToTodayBtn)``;

const Footer = styled.footer`
  width: 100%;
  background-color: #f6f6f6;
  border-top: 1px solid #e9e9e9;
  position: sticky;
  bottom: 0;
  display: flex;
  padding: 15px 0;
`;

const CalendarFooterContainer = styled.div`
  display: flex;
  width: 87%;
  margin: 0 auto;
  justify-content: space-between;
`;
const CalendarFooter = ({ onToToday, toDelete, onDeleteEvent }) => {
  return (
    <Footer>
      <CalendarFooterContainer>
        <ToTodayBtn onClick={onToToday}>Today</ToTodayBtn>
        {toDelete !== "" && (
          <DeleteButton onClick={onDeleteEvent}>Delete</DeleteButton>
        )}
      </CalendarFooterContainer>
    </Footer>
  );
};
export default CalendarFooter;
