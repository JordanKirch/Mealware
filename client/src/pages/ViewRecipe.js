import React, { Component, useEffect } from "react";
import "../styles/components/ViewRecipe.css";
import setting from "../Pictures/Vector.svg";
import food from "../Pictures/BeefTaco.jpg";
import { Link } from "react-router-dom";
import FormDialog from "../components/FormDialog";
import axios from 'axios';


class ViewRecipe extends Component {

  constructor(props){
    super(props);
      this.state ={
        id: null,
        name: null,
        cookTime: null,
        prepTime: null,
        ingredients: null,
        directions: null,
        description: null,
        imageUrl: null
      };
    }
  }

  useEffect(() => {
    fetch('/api/recipes?id='+this.state.id, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data =>{
      this.setState({name: data.name, cookTime: data.cookTime});

    }).catch(error =>{
      alert(error);
    });
    // axios.get('http://localhost:5000/recipes/id').then((res) =>{
    //   console.log(res);
    // });
  }, []);

  container = React.createRef();
  state = {
    open: false,
  };
  handleSettingClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  dialog = {
    isOpen: false,
  };

  render() {
    return (
      <div className="recipePage">
        <div className="titleRow">
          <div className="titleAndShare">
            <h1>Beef Tacos</h1>
            <div className="dialog">
              <FormDialog />
            </div>
          </div>
          <div className="container" ref={this.container}>
            <img
              src={setting}
              id="setting"
              onClick={this.handleSettingClick}
            ></img>
            {this.state.open && (
              <div className="dropdown">
                <ul>
                  <li>Edit</li>
                  <li>Delete</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="recipeMeta">
          <h4>Author: {<Link to="/home">John Doe</Link>}</h4>
          <h4>Prep Time: 10 min</h4>
          <h4>CookTime: 30min</h4>
        </div>
        <div className="image">
          <img src={food}></img>
        </div>
        <div className="description">
          <p>Beef Taco are a classic food item that everyone enjoys.</p>
        </div>

        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li>Ground Beef</li>
            <li>Lettuce</li>
            <li>Tomatoes</li>
            <li>Cheese</li>
          </ul>
        </div>
        <div className="directions">
          <h2>Directions</h2>
          <ol>
            <li>noodles</li>
            <li>cook</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default ViewRecipe;
