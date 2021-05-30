import { useState } from "react"
import { Wrapper, Row, Header, Image, Form, Search, Button } from "./components/styled/index"
import cat from "./images/cat.svg"
import axios from "axios";
import JokeItem from "./components/JokeItem";
import { Joke } from "./common/types"



const App = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(false)
  const [jokes, setJokes] = useState<Joke[]>([])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const BASE_URL = "https://v2.jokeapi.dev/joke/Any";

  const getJokes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ENDPOINT = `${BASE_URL}?contains=${search}&amount=10`
    const { data } = await axios.get(ENDPOINT)

    if (data.error) {
      setError(true);
      setJokes([]);
    } else {
      setError(false);
      setJokes(data.jokes)
    }
    setSearch("")
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Joke App</Header>
          <Image src={cat} alt="Cat" />
        </Row>
        <Form onSubmit={getJokes}>
          <Search type="text" placeholder="Search Joke" value={search} onChange={handleChange} />
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          {error && <p>Sorry, No Jokes Found!</p>}
          {jokes.length > 0 && jokes.map(joke => <JokeItem key={joke.id} joke={joke} />)}
        </div>
      </Wrapper>
    </div>
  )
}

export default App
