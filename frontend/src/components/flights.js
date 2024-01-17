import React, { useState } from 'react';
import { Button, Label, Card, Pagination, Radio } from 'flowbite-react';
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa6";
import { FaPeopleGroup } from 'react-icons/fa6';
import axios from 'axios';
import Select from 'react-select';
import Cities from './cities.json';

export default function Flights({locationName,startDate,endDate,planid}){
  const planId = planid ? planid.toString() : '';
  const [flights, setflights] = useState([]);
//   const [selectedflights, setSelectedflights] = useState([]);
  const [date, setDate] = useState(startDate);
  const [classOfService, setservice] = useState('Economy');
  const [itenaryType , setType] = useState('One-Way');
  const [arrivalCity, setarrivalCity] = useState({
    value: locationName,
    label: locationName,
  });
  const [departureCity, setdepartureCity] = useState({
    value: locationName,
    label: locationName,
  });
  const [adults, setadults] = useState(1);
  const [pageNumber, setPageNumber] = useState();

  const onPageChange = (page) => setPageNumber(page);

  

  React.useEffect(() => {
  

    const FetchFlights = () => {
      try {
        axios.get(
          `http://localhost:8000/hotels`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setflights(response.data);
        })
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };


    
    FetchFlights();
  }, [planId]);

  


  function renderFilter() {
    return (
      <div className="mx-auto flex flex-wrap border-b-2 mb-4">
        <div className=' border rounded-md shadow-sm flex h-10 m-3 mt-2'>
        <div className="flex items-center gap-2 m-2">
          <Radio id="Economy" name="ClassofService" onChange={() => setservice('ECONOMY')} checked color="purple" />
          <Label>Economy</Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="Business" name="ClassofService" onChange={() => setservice('BUISNESS')} color="purple" />
          <Label >Business </Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="PremiumEco" name="ClassofService" onChange={() => setservice('PREMIUM_ECONOMY')} color="purple" />
          <Label >Premium Economy </Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="First" name="ClassofService" onChange={() => setservice('FIRST')} color="purple" />
          <Label >First </Label>
        </div>
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="departureCity" className="text-sm font-medium text-gray-700 dark:text-white">
            <FaPlaneDeparture className='mx-auto' />Departure City 
            </Label>
            <Select
            options={Cities}
            className="w-40 m-2 mt-0 h-6 border rounded-md text-md shadow-lg"
            value={departureCity}
            onChange={(selectedOption) => setdepartureCity(selectedOption)}
            required
            />
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="arrivalCity" className="text-sm font-medium text-gray-700 dark:text-white">
            <FaPlaneArrival className='mx-auto' /> Arrival City
            </Label>
            <Select
            options={Cities}
            className="w-40 m-2 mt-0 h-6 border rounded-md text-md shadow"
            value={arrivalCity}
            onChange={(selectedOption) => setarrivalCity(selectedOption)}
            required
            />
        </div>
        <div className="flex items-center ml-4 m-2">
          <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700 dark:text-white">
            Date
          </Label>
          <input
            type="date"
            id="date"
            name="date"
            className=" m-2 p-2 border rounded-md w-36"
            value={date}
            min={startDate}
            max={endDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className=' border rounded-md shadow-sm flex h-10 ml-3 mr-3 mt-2 mb-0'>
        <div className="flex items-center gap-2 m-2 ">
          <Radio id="OneWay" name="ItenaryType" onChange={() => setType('One-Way')} checked color='purple' />
          <Label htmlFor="sortPrice">One Way</Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="RoundTrip" name="ItenaryType" onChange={() => setType('RoundTrip')} color='purple' />
          <Label htmlFor="sortRating">Round Trip </Label>
        </div>
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="numberOfPeople"  className='text-sm font-medium text-gray-700 dark:text-white'><FaPeopleGroup />Adults</Label>
          </div>
          <input id="groupSize" type="number" placeholder="adults" className='m-2 mt-4 p-2 border rounded-md text-md shadow h-8 w-14' defaultValue={1} min={1} name='numberOfPeople' value={adults} onChange={(e) =>setadults(e.target.value) } required />
        <Button pill className="w-16 ml-2 h-10 m-4" color="purple" onClick={handleApply}>
          Apply
        </Button>
      </div>
    );
  }
  
  
  

  

//   function handleAdd(index, selectedFlight) {

//     const updatedFlights = [...flights];
//     const flight = updatedFlights[index];
  
//     setSelectedflights((prevSelected) => [...prevSelected, selectedFlight]);
  
//     updatedFlights[index] = { ...flight, add: true, remove: false };
//     setflights(updatedFlights);
//   }
  
//   function handleRemove(index, selectedFlight) {
   
//     const updatedFlights = [...flights];
  
//     setSelectedflights((prevSelected) =>
//       prevSelected.filter((flight) => flight._id !== selectedFlight._id)
//     );
  
//     const flight = updatedFlights[index];
//     updatedFlights[index] = { ...flight, add: false, remove: true };
//     setflights(updatedFlights);
//   }
  
  
//   function handleSave() {
//     console.log("Selected Hotels:", selectedflights);
//     axios.post(
//       `http://localhost:8000/plan/save/${planId}`,
//       JSON.stringify(selectedflights),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }

//     )
//     .then((response) => {
//       console.log("Hotels saved successfully: ",  response);
//     })
//     .catch((error)=>{
//       console.error('Error submitting filter:', error);
//       if (error) {
        
//         console.error('Server responded with:', error.data);
//       } else if (error.request) {
//         console.error('No response received');
//       } else {
//         console.error('Error setting up the request:', error.message);
//       } 
//     } )
//   }

  const handleApply=  (event) => {
    event.preventDefault();
    console.log(departureCity.value,arrivalCity.value,itenaryType,classOfService, date,adults, pageNumber);
    axios.post(
      `http://localhost:8000/plan/${planId}`,
      JSON.stringify(departureCity,arrivalCity,itenaryType,classOfService, date,adults, pageNumber),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setflights(response.data);
    })
    .catch((error)=>{
      console.error('Error submitting filter:', error);
      if (error) {
        
        console.error('Server responded with:', error.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
      } 
    } )
  }
  

  return (
    <div className=''>
    <div className='w-full flex-col top-0 '>
      {
        renderFilter()
      } 
    </div>
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Flights</h1>
            {flights.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-fit">Oops!! No Flights Available.
                </p>
            ) : (
                <div>
                <ul className='bg-white'>
                    {flights.map((flight, index) => (
                    <div key={index} className=''>
                        <Card className="md:max-w-4xl mr-4 ml-12 mt-6 mb-6" imgSrc={flight.logo} horizontal>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flight.airline}</h3>
                        <p className="font-semibold text-gray-700 dark:text-gray-400">{flight.departureTime} - {flight.arrivalTime}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Class of Service: {flight.classOfService}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Book: <a href={flight.purchaseUrl}>{flight.purchaseUrl}</a></p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price/room: {flight.totalPrice}</p>
                        </Card>
                    </div>
                    ))}
                </ul>
                <div className="flex overflow-x-auto ml-20 md:justify-center">
                    <Pagination
                    layout="navigation"
                    currentPage={pageNumber}
                    onPageChange={onPageChange}
                    onClick={handleApply}
                    showIcons
                    />
                </div>
                {/* <div className='flex justify-center mt-4'>
                    <Button className='rounded-full' color='purple' onClick={handleSave}>Save</Button>
                </div> */}
                </div>

                )
              }
    </div>
  )
}
