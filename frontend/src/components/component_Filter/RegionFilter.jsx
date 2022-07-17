import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Country, State, City } from 'country-state-city';
import './Filter.css';

function RegionFilterElement(props) {
  const updateFunction = props.updateFunction;
  const handleUpdate = (e, value, reason) => {
    if (reason === 'clear') {
      updateFunction(null);
    } else {
      updateFunction(value);
      // props.id === 'city' ? updateFunction(value.name) : updateFunction(value.isoCode);
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
        handleUpdate(e, value, reason);
      }}
      value={props.value}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

export default function RegionFilter(props) {
  const countries = Country.getAllCountries();
  // const [country, setCountry] = React.useState(null);
  // const [state, setState] = React.useState(null);
  // const [city, setCity] = React.useState(null);

  const [filter, setFilter] = props.updateFilter;
  const setCountry = (value) => {
    setFilter({ ...filter, country: value });
  };
  const setState = (value) => {
    setFilter({ ...filter, state: value });
  };
  const setCity = (value) => {
    setFilter({ ...filter, city: value });
  };

  const getState = (countryCode) => {
    return State.getStatesOfCountry(countryCode);
  };
  const getCity = (countryCode, stateCode) => {
    return stateCode ? City.getCitiesOfState(countryCode, stateCode) : City.getCitiesOfCountry(countryCode);
  };
  // React.useEffect(() => {
  //   setFilter((filter) => ({ ...filter, country: country, state: state, city }));
  // }, [country, state, city]);

  return (
    <>
      <h3>Region</h3>
      <div className="region_filter_container">
        <RegionFilterElement
          id="country"
          label="Country"
          options={countries}
          updateFunction={setCountry}
          value={filter.country}
        />

        {filter.country && (
          <RegionFilterElement
            id="state"
            label="State"
            options={getState(filter.country?.isoCode)}
            updateFunction={setState}
            value={filter.state}
          />
        )}

        {(filter.state || filter.country) && (
          <RegionFilterElement
            id="city"
            label="City"
            options={getCity(filter.country?.isoCode, filter.state?.isoCode)}
            updateFunction={setCity}
            value={filter.city}
          />
        )}
      </div>
    </>
  );
}
