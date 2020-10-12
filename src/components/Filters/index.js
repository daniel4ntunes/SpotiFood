import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import { MdSearch, MdClose } from "react-icons/md";
import {
  Grid,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  ButtonGroup,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import {
  loadingPlaylists,
  listPlaylists,
  searchPlaylists,
  failurePlaylists,
} from "../../store/actions/playlists";
import api from "../../services/api";

const Filters = () => {
  const [filters, setFilters] = useState([]);
  const [showFilterOptions, setShowFilterOption] = useState(false);
  const [search, setSearch] = useState("");
  const [fields, setFields] = useState({
    locale: "",
    country: "",
    timestamp: "",
    limit: "",
    offset: "",
  });
  const [hasButtonReset, setHasButtonReset] = useState(false);

  const dispatch = useDispatch();

  const checkParams = (params) => {
    const filtered = Object.entries(params)
      .filter((value) => value[1])
      .reduce((obj, key) => {
        obj[key[0]] = key[1];
        return obj;
      }, {});

    return filtered;
  };

  const handleChangeFilter = (reset = false) => {
    const params = (!reset && checkParams(fields)) || {};

    setHasButtonReset(Object.keys(fields).length > 0);

    if (reset) {
      setFields({
        locale: "",
        country: "",
        timestamp: "",
        limit: "",
        offset: "",
      });
      setHasButtonReset(false);
    }

    dispatch(loadingPlaylists());
    api
      .get("browse/featured-playlists", {
        params,
      })
      .then((response) => {
        dispatch(listPlaylists(response.data.playlists.items));
      })
      .catch((error) => {
        dispatch(failurePlaylists(error.response.data));
      });
  };

  useEffect(() => {
    axios
      .get("https://www.mocky.io/v2/5a25fade2e0000213aa90776")
      .then((response) => {
        const fields = response.data.filters.map((field) => {
          if (field?.values) {
            field.type = "select";
          }
          if (
            field?.validation?.primitiveType === "STRING" &&
            field?.validation?.entityType === "DATE_TIME"
          ) {
            field.type = "date";
          }
          if (field?.validation?.primitiveType === "INTEGER") {
            field.type = "number";
          }

          return field;
        });

        setFilters(fields);
      });
  }, []);

  useEffect(() => {
    dispatch(searchPlaylists(search));
  }, [search, dispatch]);

  return (
    <>
      <Grid item lg={10} md={8} xs={12}>
        <TextField
          id="search"
          label="Search a playlist..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item lg={2} md={4} xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={showFilterOptions}
              onChange={() => setShowFilterOption(!showFilterOptions)}
              name="filters"
              color="primary"
            />
          }
          label={`${(!showFilterOptions && "Show") || "Hide"} Filters`}
        />
      </Grid>
      {showFilterOptions && (
        <>
          {filters.map(
            (filter, key) =>
              (filter.type === "select" && (
                <Grid key={key} item md={6} xs={12}>
                  <TextField
                    id={filter.id}
                    label={filter.name}
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={fields[filter.id] || ""}
                    onChange={(e) =>
                      setFields({
                        ...fields,
                        [filter.id]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filter.values.map((option, key) => (
                      <MenuItem key={key} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )) ||
              (filter.type === "date" && (
                <Grid key={key} item md={3} xs={12}>
                  <TextField
                    id={filter.id}
                    label={filter.name}
                    type="datetime-local"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      (fields[filter.id] &&
                        format(
                          new Date(fields[filter.id]),
                          "yyyy-MM-dd'T'HH:mm"
                        )) ||
                      ""
                    }
                    onChange={(e) =>
                      setFields({
                        ...fields,
                        [filter.id]: format(
                          new Date(e.target.value),
                          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
                        ),
                      })
                    }
                  />
                </Grid>
              )) ||
              (filter.type === "number" && (
                <Grid key={key} item md={3} xs={12}>
                  <TextField
                    id={filter.id}
                    label={filter.name}
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: filter?.validation?.min,
                        max: filter?.validation?.max,
                      },
                    }}
                    value={fields[filter.id] || ""}
                    onChange={(e) =>
                      setFields({
                        ...fields,
                        [filter.id]: e.target.value,
                      })
                    }
                  />
                </Grid>
              ))
          )}
          <Grid item md={3} xs={12}>
            <ButtonGroup
              variant="contained"
              fullWidth
              aria-label="contained primary button group"
            >
              <Button
                color="primary"
                startIcon={<MdSearch />}
                onClick={() => handleChangeFilter()}
              >
                Apply
              </Button>
              {hasButtonReset && (
                <Button
                  color="primary"
                  startIcon={<MdClose />}
                  onClick={() => handleChangeFilter(true)}
                >
                  Reset
                </Button>
              )}
            </ButtonGroup>
          </Grid>
        </>
      )}
    </>
  );
};

export default Filters;
