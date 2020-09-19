import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    query: '',
    posts: []
  }

  search = (event) => {
    if(event.key === "Enter"){
      axios({
        "method":"GET",
        "url":"https://community-open-weather-map.p.rapidapi.com/find",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key":"d14e1acff8mshc2592e6a54fecb8p103835jsn623176deb099",
        "useQueryString":true
        },"params":{
        "type":"link%2C accurate",
        "units":"imperial%2C metric",
        "q":`${this.state.query}`
        }
        })
        .then((response)=>{
          this.setState({
            posts: response.data.list
          })
          console.log(this.state.posts);
        })
        .catch((error)=>{
          console.log(error)
        })
    }
  }

  dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  changeHandler = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    let classes = ['app'];

    if(Array.isArray(this.state.posts) && this.state.posts.length){
      if(this.state.posts[0].weather[0].main === 'Rain'){
        classes = ['app', 'rain'];
      }
      if(this.state.posts[0].weather[0].main === 'Clear'){
        classes = ['app', 'warm'];
      }
      if(this.state.posts[0].weather[0].main === 'Haze'){
        classes = ['app', 'haze'];
      }
      if(this.state.posts[0].weather[0].main === 'Mist'){
        classes = ['app', 'Mist'];
      }
    }

    return (
      <div className = "background">
        <div className = {classes.join(' ')}>
          <main>
            <div className = "search-box">
              <input type = "text" className = "search-bar" placeholder = "Enter the name of city or country..." 
              onChange = {this.changeHandler} value = {this.state.query} 
              onKeyPress = {this.search} />
            </div>
            {(Array.isArray(this.state.posts) && this.state.posts.length) ? 
              <div>
                <div className = "location-box">
                <div className = "location">
                  {this.state.posts[0].name}, {this.state.posts[0].sys.country}
                </div>
                <div className = "date">{this.dateBuilder(new Date())}</div>
                </div>
                <div className = "weather-box">
                <div className = "temp">
                  {Math.round(this.state.posts[0].main.temp - 273.15)}ºC
                </div>
                <div className = "weather">{this.state.posts[0].weather[0].main}</div>
                </div> 
              </div> : null
            }
            <p className = "footer">Copyright &copy; 2020 Made By Avas Bajracharya</p>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
