import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Country, State, City } from 'country-state-city';
import './Filter.css';

function RegionFilterElement(props) {
  const updateFunction = props.updateFunction;
  const handleUpdate = (value, reason) => {
    if (reason === 'clear') {
      updateFunction(null);
    } else {
      props.id === 'city' ? updateFunction(value.name) : updateFunction(value.isoCode);
    }
  };
  return (
    <Autocomplete
      className="region_filter_box"
      disablePortal
      id={props.id}
      getOptionLabel={(option) => option.name}
      options={props.options}
      onChange={(e, value, reason) => {
        handleUpdate(value, reason);
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

export default function RegionFilter() {
  const countries = Country.getAllCountries();
  const [country, setCountry] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const region = { country, state, city };

  const getState = (countryCode) => {
    return State.getStatesOfCountry(countryCode);
  };
  const getCity = (countryCode, stateCode) => {
    return stateCode ? City.getCitiesOfState(countryCode, stateCode) : City.getCitiesOfCountry(countryCode);
  };
  React.useEffect(() => {
    console.log(region);
  }, [region]);

  return (
    <>
      <h3>Region</h3>
      <div className="region_filter_container">
        <RegionFilterElement id="country" label="Country" options={countries} updateFunction={setCountry} />

        {region.country && (
          <RegionFilterElement id="state" label="State" options={getState(region.country)} updateFunction={setState} />
        )}

        {(region.state || region.country) && (
          <RegionFilterElement
            id="city"
            label="City"
            options={getCity(region.country, region.state)}
            updateFunction={setCity}
          />
        )}
      </div>
    </>
  );
}
