import React, {useState, useEffect} from 'react'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'

const Events = () => {
  const [AllEvents, setAllEvents] = useState([]);

  const fetchAllAllEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/allevents", {
        credentials: "include" // Include credentials in the request
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access
          console.error("Unauthorized access. Please login.");
          // Redirect user to login page or display an error message
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      const data = await response.json();
      console.log(data);
      setAllEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle other errors
    }
  };
  

  useEffect(() => {
    fetchAllAllEvents();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  return (
    <div className="w-full overflow-y-scroll no-scrollbar rounded-3xl grid grid-cols-3 place-items-center gap-12 py-8">
      {AllEvents.map(item => (
        <Card
          id={item._id}
          title={item.event_title}
          img={item.cover_img_url}
        />
      ))}
    </div>
  )
}

export default Events
