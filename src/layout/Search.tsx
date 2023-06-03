import { Autocomplete, Box, TextField } from "@mui/material";
import { useState, useMemo, SyntheticEvent } from "react";
import { debounce } from "lodash";

interface Prediction {
  properties: {
    address_line1: string;
    lon: number;
    lat: number;
  };
}

interface Response {
  features: Array<Prediction>;
}

export const Search: React.FC<{
  setViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
    }>
  >;
}> = ({ setViewState }) => {
  const [options, setOptions] = useState<Array<Prediction>>([]);
  const [open, setOpen] = useState(false);
  const isLoading = open && !options.length ? true : false;

  const fetchPredictions = useMemo(
    () =>
      debounce(
        (query: string) =>
          fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${
              import.meta.env.VITE_GEOAPIFY_ACCESS_TOKEN
            }`
          ),
        400
      ),
    []
  );

  const handleInputChange = async (
    event: SyntheticEvent,
    value: string | null
  ) => {
    if (!value) return setOptions([]);
    const response = await fetchPredictions(value);
    if (response?.ok) {
      const data: Response = await response.json();
      setOptions(data.features);
    }
  };

  const handleChange = (event: SyntheticEvent, option: Prediction | null) => {
    if (option) {
      setViewState((prevState) => ({
        ...prevState,
        longitude: option.properties.lon,
        latitude: option.properties.lat,
      }));
    }
  };

  return (
    <div>
      <Autocomplete
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.properties.address_line1
        }
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
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        renderOption={(props, option) => {
          console.log("option", option.properties.address_line1);
          return (
            <li {...props}>
              <Box>{option.properties.address_line1}</Box>
            </li>
          );
        }}
      />
    </div>
  );
};
