import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl } from "@material-ui/core";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CONTINENT } from "./query/country";
import { GET_CONTINENTS } from "./query/continents";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface IContinent {
  name: string;
  code: string;
}

interface IContinentData {
  continents?: IContinent [];
}

interface ICountry {
  name: string;
  code: string;
}

interface ICountryData {
  countries?: ICountry [];
}

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const App:React.FC = (): JSX.Element => {
  const [continent, setContinent] = useState<string>("");
  const { loading, error, data, refetch } = useQuery<ICountryData>(!continent ? GET_COUNTRIES() : GET_COUNTRIES_BY_CONTINENT(continent));
  const { loading: loadingContinents, error: errorContinents, data: dataContinents } = useQuery<IContinentData>(GET_CONTINENTS());
  // const [countries, setCountries] = useState([]);
  const classes = useStyles();
  console.log(continent);
  console.log(dataContinents);
  console.log(data);

  // React.useEffect(() => {
  //   refetch();
  // }, [continent]) 


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Continent</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={continent || ""}
            onChange={(e: SelectChangeEvent) => setContinent(e.target.value)}
            >
            {dataContinents && (dataContinents?.continents || []).map((option, index) =>{
              return (<MenuItem key={`continent-${index}`} value={option.code}>{option.name}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </div>
      <div>
        {data && (data?.countries || []).map((country, index) => (
          <div key={`country-${index}`}>
            {country.name} {country.code}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



// const inputHendler = (e: React.ChangeEvent<HTMLInputElement>): void | undefined => {
//   const enteredContinent = e.target.value;
//   setContinent(enteredContinent);
// }
