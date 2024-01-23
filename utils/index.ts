import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
            'X-RapidAPI-Key': '8873125369msh84bb4d429b68c36p184f45jsn1bcccc6bb196',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch (`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {headers: headers,});

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDayUSD = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age
  const usdToInrExchangeRate = 83; // Exchange rate from USD to INR (update as needed)

  // Calculate additional rate based on mileage and age
  const mileageRateUSD = city_mpg * mileageFactor;
  const ageRateUSD = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day in USD
  const rentalRatePerDayUSD = basePricePerDayUSD + mileageRateUSD + ageRateUSD;

  // Convert the rental rate to INR
  const rentalRatePerDayINR = rentalRatePerDayUSD * usdToInrExchangeRate;

  return rentalRatePerDayINR.toFixed(0); // Rounded to the nearest Rupee
};

  

  export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');

    const {make, year, model } = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  }

  export const updadateSearchParams = (type: string, value: string) => {
    const searchParams =new URLSearchParams(window.location.search);

      searchParams.set(type, value)

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

      return newPathname;
  }