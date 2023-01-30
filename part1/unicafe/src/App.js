import { useState } from 'react'

const Button = ({ onClick, value }) => {
  return (<button onClick={onClick}>
    {value}
  </button>)
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  let average = 0
  let positive = 0
  if (total > 0) {
    average = (good - bad) / total
    positive = good / total * 100

    return (<div>
      <h1>statistics</h1>
      <table><tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive+'%'} />
</tbody></table>
    </div>)
  } else {
    return (<div></div>)
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrGood = () => {
    setGood(good + 1)
  }

  const incrNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={incrGood} value='good' />
        <Button onClick={incrNeutral} value='neutral' />
        <Button onClick={incrBad} value='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App;
