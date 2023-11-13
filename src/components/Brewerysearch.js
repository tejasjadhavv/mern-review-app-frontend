import { Link } from "react-router-dom";
import React, { useState } from "react";
import Stars from "../components/Star";
import { useAuthContext } from "../hooks/useAuthContext";

const BreweryList = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchOption, setSearchOption] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchData = async () => {
    let url = "/api/breweries/search";

    if (searchOption !== "all") {
      url += `?${searchOption}=${searchValue}`;
    }

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBreweries(data);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    setIsLoading(true);
    fetchData();
  };

  return (
    <div>
      <h3>Brewery Search</h3>
      <form onSubmit={handleSubmit} className="create">
        <label htmlFor="searchOption">Search by: </label>
        <select
          id="searchOption"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          className="dropdown "
        >
          <option value="all">All</option>
          <option value="city">By City</option>
          <option value="name">By Name</option>
          <option value="brewery_type">By Type</option>
        </select>

        {searchOption !== "all" && (
          <div>
            <label htmlFor="searchValue">Enter {searchOption}: </label>
            <input
              type="text"
              id="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}

        <button type="submit">Show</button>
      </form>
      {error && <div className="error">{error}</div>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {breweries.map((brewery) => (
            <div className="brewery-details">
              <p key={brewery.id}>
                <h4>{brewery.name}</h4>
                <p>Address: {brewery.address_1}</p>
                <p>Type: {brewery.brewery_type}</p>
                <p>City: {brewery.city}</p>
                <p>Phone No: {brewery.phone}</p>
                <p>Website: {brewery.website_url}</p>
                <h3>
                  Rating: <Stars rating={brewery.rating} />{" "}
                </h3>

                <Link to={`/${brewery.id}`}>View Details</Link>
              </p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BreweryList;
