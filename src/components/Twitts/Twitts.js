import React, { useState, useEffect } from "react";
import classes from "./Twitts.module.css";
import axios from "axios";
import Twitt from "../Twitt/Twitt";
import spin from "../../static/spin.svg";

const base_url =
  "https://magiclab-twitter-interview.herokuapp.com/candidate-name/";

function Twitts() {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

 //   fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalTime = 2000;
    const interval = setInterval(() => {
      fetchData();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [list]);


  const fetchData = () => {
    axios
      .get(base_url + "api?count=10")
      .then((res) => {
        if (res && res.data) {
          const twitts = res.data;
          let filteredTwitts = filterTwitts(twitts);
          updateList(filteredTwitts);
          setIsLoaded(true);
          setError(false);
        }
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(true);
      });
  };

  const updateList = (newData) => {
      return list.length < 100 ? setList([...list, ...newData]) : resetBeforeUpdating(newData);
  }

  const resetBeforeUpdating = (newData) => {
    axios.get(base_url + "reset").then(
      setList([...newData])
    );
  };

  // check if the returned twitts are not already in the list
  // and return just the unique twitts
  const filterTwitts = (results) => {
    //   remove duplicates
    const uniqueTwitts = results.filter( (value, idx) => results.indexOf(value) === idx)

    return uniqueTwitts.map( item => {
      if (list.indexOf(item.id) === -1) return item;
    });
  };


  const renderContent = () => {
    let content = null;
    if (error) {
    //   if list is empty fetch again don't wait for the intervalTime
      if (!list.length ) {
        fetchData();
      } else {
        content = renderTwitts();
      }
    } else if (!isLoaded) {
      // Add a loader
      content = renderLoader();
    } else {
      content = renderTwitts();
    }
    return content;
  };


  //   order the list, newer twitts will be at the top
  const renderTwitts = () => {
    return list.sort((item1, item2) =>  item1.timeStamp - item2.timeStamp)
          .reverse()
          .map( item => <Twitt key={item.timeStamp} {...item} />);
     };

  const renderLoader = () => {
    return (
      <div className={classes.Twitts_loading}>
        <img src={spin} alt="loading"/>
        <p>Loading...</p>
      </div>
    );
  };

  return <div className={classes.Twitts_results}>{renderContent()}</div>;
}

export default Twitts;
