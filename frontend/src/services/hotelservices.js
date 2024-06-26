import axios from 'axios';
import { getLocationId } from './getgeolocationid';


const searchHotels = async (locationName, checkin, checkout, adults, pageNumber = 1, sortby = 'PRICE') => {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
            geoId: await getLocationId(locationName),
            checkIn: checkin,
            checkOut: checkout,
            pageNumber: pageNumber.toString(),
            currencyCode: 'INR',
            adults: adults,
            sort: sortby
        },
        headers: {
            'X-RapidAPI-Key': 'fdf27181b2msh518ba6f8db6838dp14cd4djsnbef46d023756',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        }
    };

    try {
        const response = await axios.request(options);

        if (response.status >= 200 && response.status < 300) {

            console.log(response.data.data.data);
            const relevantHotelDetails = Array.isArray(response.data.data.data)
                ? extractRelevantHotelDetails(response.data.data.data)
                : [];
            console.log(relevantHotelDetails);
            return relevantHotelDetails;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


const extractRelevantHotelDetails = (hotelData) => {
    if (!Array.isArray(hotelData)) {
        return [];
    }
    return hotelData.map((hotel) => ({
        name: hotel.title,
        location: hotel.secondaryInfo,
        price: hotel.priceForDisplay,
        url: hotel.commerceInfo.externalUrl,
        imageUrl: hotel.cardPhotos[0].sizes.urlTemplate.split('?')[0] || null,
        rating: hotel.bubbleRating.rating
    }));
};

export { searchHotels };
