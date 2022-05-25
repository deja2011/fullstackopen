const App1 = () => {
  const course = 'Half Stack application develoopment'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = (props) => (
  <div>
      {props.part1}
      {props.part2}
      {props.part3}
  </div>
)

const Total = (props) => (
  <p>Number of exercises {props.number}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const part1E = <Part part={part1} exercises={exercises1} />
  const part2E = <Part part={part2} exercises={exercises2} />
  const part3E = <Part part={part3} exercises={exercises3} />
  return (
    <div>
      <Header course={course} />
      <Content part1={part1E} part2={part2E} part3={part3E} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;
