const Hello = (props) => (
  <div>
    <p>Hello World, and {props.name}</p>
  </div>
)
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Lawrence"/>
      <Hello name="Margaret"/>
    </>
  )
}

export default App