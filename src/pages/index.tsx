import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [facts, setFacts] = useState([''])
  const [factToShow, setFactToShow] = useState('')
  const [factCount, setFactCount] = useState(0)
  const [triggerCallApi, setTriggerCallApi] = useState(false)

  useEffect(() => {
    const axios = require('axios')
    const blackList = ['fuck', 'ass', 'bitch', 'jackass']

    async function getFacts() {
      const factsList = []
      let i

      for (i = 0; i < 10; i++) {
        const { data } = await axios.get(
          'https://api.chucknorris.io/jokes/random'
        )
        const factSplit = data.value.toLowerCase().split(' ' || ',' || '.')
        const check = factSplit.some((word: string) => blackList.includes(word))
        factsList.push(data.value)
      }
      console.log('fez call api')
      setFacts(factsList)
      setTriggerCallApi(false)
    }

    getFacts()
  }, [triggerCallApi])

  function handleShowFact() {
    setFactToShow(facts[factCount])
    setFactCount(factCount + 1)
  }

  if (factCount === 10) {
    setTriggerCallApi(true)
    setFactCount(0)
  }

  function handleClick() {
    console.log(facts)
  }

  return (
    <>
      <h1>ChuckFacts</h1>
      <p>{factToShow}</p>
      <button onClick={handleShowFact}>Generate</button>
      <button onClick={handleClick}>ver facts</button>
    </>
  )
}

export default Home
