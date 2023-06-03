import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useState, useMemo, SyntheticEvent } from "react";
import { debounce } from "lodash";
import { LocationOption } from "../types";

interface Response {
  features: Array<LocationOption>;
}

export const Search: React.FC<{
  setViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
    }>
  >;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationOption | undefined>
  >;
}> = ({ setViewState, setSelectedLocation }) => {
  const [options, setOptions] = useState<Array<LocationOption>>([]);
  const [open, setOpen] = useState(false);
  const isLoading = open && !options.length ? true : false;

  const fetchLocationOptions = useMemo(
    () =>
      debounce(async (query: string) => {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${
            import.meta.env.VITE_GEOAPIFY_ACCESS_TOKEN
          }`
        );

        if (response?.ok) {
          const data: Response = await response.json();
          setOptions(data.features);
        }
      }, 400),
    []
  );

  const handleInputChange = async (
    event: SyntheticEvent,
    value: string | null
  ) => {
    console.log("value", value);
    if (value) {
      fetchLocationOptions(value);
    }
  };

  const handleChange = (
    event: SyntheticEvent,
    option: LocationOption | null
  ) => {
    if (option) {
      setViewState((prevState) => ({
        ...prevState,
        longitude: option.properties.lon,
        latitude: option.properties.lat,
      }));
      setSelectedLocation(option);
    }
  };

  return (
    <div>
      <Autocomplete
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={options}
        autoComplete
        getOptionLabel={(option) => option.properties.formatted}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="body1">
                    {option.properties.address_line1}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {option.properties.address_line2}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </div>
  );
};
