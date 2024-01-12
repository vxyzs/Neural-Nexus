import React, {useState} from 'react';
import { Button, Checkbox, Label,Card } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";

export default function Restaurants (){
    const [filter, setfilter] = useState(false);

    const [restaurants, setrestaurants] = useState([]);
  
    function handleClick(){
      setfilter(!filter);
    }
  
    function renderFilter(){
      return(
        <div className=' mb-5 -mt-2'>
          <div className="ml-5 mr-5  inline-flex gap-2">
          <Checkbox id="promotion" />
          <Label htmlFor="promotion">Option 1</Label>
        </div> 
        <div className="ml-5 m-2 inline-flex gap-2">
          <Checkbox id="promotion" />
          <Label htmlFor="promotion">Option 2</Label>
        </div>
        </div>
      )
    }
  
    return (
    <div className='ml-10'>
      <div className='w-full flex-col top-0 '>
        <Button className=' text-xl font-semibold m-5 ml-4 -mt-4 bg-transparent hover:shadow' style={{color: '#5F2EEA', backgroundColor: 'white', font: 'poppins'}} onClick={handleClick} ><FaFilter />Filter</Button>
        {
          filter? renderFilter() : null 
        } 
      </div>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover', 'font': 'poppins' }}>Restaurants_______</h1>
            {restaurants.length === 0 ? (
                <p className="container border rounded-md shadow bg-white p-6 pl-12 mt-6 mb-12 font-bold text-7xl w-full" style={{font: 'poppins'}}>Oops!! No Restaurants Available.
                </p>
            ) : (
                <ul className='container border rounded-md shadow bg-white'>
                    {restaurants.map((plan, index) => (
                        <Card key={index} className=" w-cover ml-12 mt-6 mb-6 mb" style={{font: 'poppins'}}  horizontal >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.tripName}</h3>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Destination: {plan.cityToVisit}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Group Size: {plan.numberOfPeople}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Budget: {plan.budget}</p>
                        </Card>
                    ))}
                </ul>
                )
              }
    </div>
    )

}
