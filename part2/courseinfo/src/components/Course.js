const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <div>
    {part.name} {part.exercises}
  </div>

const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>

const Course = ({ course }) => {
  return (<div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((a, b) => a + b.exercises, 0)} />
  </div>)

}

export default Course