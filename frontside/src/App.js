import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateIndex, setUpdateIndex] = useState(null);
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAdd = async () => {
    if (name.trim() !== '' && email.trim() !== '') {
      try {
        if (updateIndex !== null) {
          await axios.put(`http://localhost:5000/data/${data[updateIndex]._id}`, { name, email });
          setUpdateCount(updateCount + 1);
        } else {
          await axios.post('http://localhost:5000/data', { name, email });
          setAddCount(addCount + 1);
        }
        setName('');
        setEmail('');
        setUpdateIndex(null);
        fetchData();
      } catch (error) {
        console.error('Error adding/updating data:', error);
      }
    } else {
      alert('Please enter valid name and email');
    }
  };

  const handleUpdate = (index) => {
    setName(data[index].name);
    setEmail(data[index].email);
    setUpdateIndex(index);
  };

  
  return (
    <>
      <div className="contained-box">
        <div className="form-box">
          <div className="button-box" ></div>

          <form id="login" className="input-groups" >
        <p> We can add , update and edit</p>

            <input
              type="text"
              className="input-field"
              placeholder="Name" required
              value={name}
              onChange={(e) => setName(e.target.value)}
               />

            <input
              type="email"
              className="input-field"
              placeholder="Email" required
              value={email}
        onChange={(e) => setEmail(e.target.value)}
              />

            <button type="submit" className="submit-btn" onClick={handleAdd}>
            {updateIndex !== null ? 'Update' : 'Add'}

            </button>
          </form>
        </div>
      </div>
{/* =========================== */}
      <div className='datalist'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button className = "edit" onClick={() => handleUpdate(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add Count: {addCount}</h3>
      <h3>Update Count: {updateCount}</h3>
      </div>

    </>
  );
};

export default App;
