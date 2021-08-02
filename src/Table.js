import './App.css';
import Posts from './Posts';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// fetching data for each user
const fetchData = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => console.error(error))
};

// helper function to extract header names
const extractHeaders = ([name, email, city, company]) => {
  const headings = {name, email, city, company};
  return Object.keys(headings);
};

// search props coming from App Component. Used for changing table view instantly by manipulating people state
function Table({search}) {
    
  const [people, setPeople] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [userId, setUserId] = useState(1);    
  
  useEffect(() => {
    fetchData()
      .then((apiPeople) => {
        setPeople(apiPeople);
        setHeaders(extractHeaders(apiPeople));
      })     
  }, [people, headers])

  return (
    <div className='tables'>
      <table className='table'>
        <thead>
          <tr>
              {headers.map((header, index) => 
                { return <th key={index}>{header}</th>}
              )}
          </tr>
        </thead>
        <tbody>
              {search(people).map((person, index) => {
                return (
                  <tr key={index} onClick={() => {
                      setClicked(() => true)
                      setUserId(() => person.id)
                  }}>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.address.city}</td>
                    <td>{person.company.name}</td>
                  </tr>
                )
              })}
        </tbody>
      </table>
      <Posts clicked={clicked} userId={userId}/>
    </div>
  );
}

export default Table;
