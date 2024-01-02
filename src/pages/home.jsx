import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [counter, setCounter] = useState(0);
    const [size, setSize] = useState(10);
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);

    const USER_API = `https://randomuser.me/api/?results=${size}&page=${index}`;
    

    const getData = async() => {
        const data = await axios.get(USER_API);
        console.log(data.data.results, 'this is the data');
        setUsers(data?.data?.results);
  }  

  const decrement = () => {
    if (counter > 0) {
        setCounter((count) => count - 1);
        setIndex((index) => index - 1)
    }
  };
  const increment = () => {
      setCounter((count) => count + 1);
      setIndex((index) => index + 1)
    };


    useEffect(() => {
        getData();
    }, [size, index])
    

    const handlePageSize = (e) => {
        setSize(e.target.value);
    }
    

  return (
      <div>
          <label> page size</label>
          <select onChange={(e)=>handlePageSize(e)} value={size}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
          </select>
          {
              users.length && users.map((user) => {
                  return (
                      <>
                          <p>{ user.name.first}</p>
                      </>
                  )
              })
            }
      <div>
        <button onClick={decrement}>prev</button>
        <button onClick={increment}>next</button>
      </div>
    </div>
  );
};

export default Home;
