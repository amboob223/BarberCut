import React, { useState, useEffect } from "react";
import "../App.css";

function Owner() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTotal = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const response = await fetch(`http://localhost:5000/owner?date=${formattedDate}`);
      const fetchedData = await response.json();

      if (fetchedData) {
        setData(fetchedData);

        // Calculate total revenue for the day
        const dayTotal = fetchedData.reduce(
          (accumulator, item) => accumulator + item.price,
          0
        );
        setTotal(dayTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the function to fetch data when the component mounts or when the selectedDate changes
    getTotal();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = async (id) => {
    try {
      // Perform a delete request to remove the entry with the given id
      await fetch(`http://localhost:5000/owner/${id}`, {
        method: "DELETE",
      });

      // After deletion, refresh the data
      getTotal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Total Revenue for the Day: ${total}</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.duration}</td>
              <td>{entry.phone}</td>
              <td>{entry.email}</td>
              <td>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





export default Owner;
//we need the payment button and a delete buttonto have a moual that ask if they sure they want to delet and set up strip tonight 
//and fix the way the total adds up 

  //owner
//we need the payment button and a delete buttonto have a moual that ask if they sure they want to delet and set up strip tonight 
//and fix the way the total adds up
// and make the table appear after the date is imputed
// to access the onwer side you need a code because the owner can delete a booking


          //on the form side we need to add that when the toatl is cofimed and clicked they are sent to a payment page on stripe

      //on app we need a nav bar that lets the user toggle betewen being an owner an seeing data from tyhe base vs being user and only seeing the form //

      // when you come one the app yuo are assumed to be a user so only owners sign in for the onwers when they sign un they can see 
    // the total for the day and the contact of the peopole;
    // they can trfack eafrnings from stripe

    //we got to send them an email with there invoice details and thats on the form side 
