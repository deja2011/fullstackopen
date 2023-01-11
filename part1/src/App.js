
const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content part1={<Part part={part1} />} part2={<Part part={part2} />} part3={<Part part={part3} />} />
      <Total number={parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} />
    </div>
  )
}

export default App;