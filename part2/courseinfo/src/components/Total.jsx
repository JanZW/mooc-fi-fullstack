const Total = (props) => {
  const total = props.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <>
      <p><b>total of {total} exercises</b></p>
    </>
  );
};

export default Total;
