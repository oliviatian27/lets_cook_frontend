import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react'
import RecipeList from './RecipeList'
import FormComponent from './FormComponent'
import RecipeDetail from './RecipeDetail'
import Navbar from './Navbar'
import {connect} from 'react-redux';
import {createUser} from '../actions/SignUp';

class Profile extends Component {




    state={
      showDetail: false,
      targetRecipe: {},
      searchBar:'',
      searchResult: [],
      userRecipes: [],
      userCollections: [],
      showForm: true
    }


    componentDidMount(){
      if (this.props.currentUser.id) {
        fetch(`https://letscook-api.herokuapp.com/users/${this.props.currentUser.id}/recipes`)
        .then(r=>r.json())
        .then(userRecipes => this.setState({userRecipes}))

        fetch(`https://letscook-api.herokuapp.com/users/${this.props.currentUser.id}/collections`)
        .then(r=>r.json())
        .then(userCollections => this.setState({userCollections}))

      }
    }




    handleFormSubmit=(e, recipeInfo)=>{
      console.log(e);
      console.log(recipeInfo);
       fetch(`https://letscook-api.herokuapp.com/users/${this.props.currentUser.id}/recipes`, {
         method:"POST",
         headers:{
           "Accept":"Application/json",
           "Content-Type":"Application/json"
         },
         body:JSON.stringify({
           user_id: 2,
           name: recipeInfo.name,
           image: recipeInfo.image,
           calories: Number(recipeInfo.calories),
           cooking_time: Number(recipeInfo.cooking_time),
           ingredients: [recipeInfo.ingredient1, recipeInfo.ingredient2, recipeInfo.ingredient3].filter(ingredient => ingredient !== "")
         })
       }).then(res=>res.json())
       .then(recipe=>this.setState(prev=>({userRecipes:[...prev.userRecipes,recipe]})))
       .then(console.log)
    }


    handleShowDetail = (recipe) => {
      this.setState({
        showDetail: true,
        targetRecipe: recipe,
        showForm: false
      })
    }



    handleFavorite=(recipe)=>{
       this.setState(prev=>({userCollections:[...prev.userCollections,recipe]}))
    }

    handleDelete = (recipe) => {
      console.log(recipe);
      let position;
      fetch(`https://letscook-api.herokuapp.com/users/${this.props.currentUser.id}/recipes/${recipe.id}`, {
        method: "DELETE",
        headers:{
         "Access-Control-Allow-Origin": "*"
       }
      })
      .then(response => response.json())
      .then(console.log)

      if (recipe.user_id === this.props.currentUser.id) {
        position = this.state.userRecipes.indexOf(recipe)
        this.setState({
          userRecipes: [...this.state.userRecipes.slice(0, position), ...this.state.userRecipes.slice(position + 1)]
        })
      } else {
        position = this.state.userCollections.indexOf(recipe)
        // debugger
        console.log([...this.state.userCollections.slice(position + 1)]);
        this.setState({
          userCollections: [...this.state.userCollections.slice(0, position), ...this.state.userCollections.slice(position + 1)]
        })
      }
      // .then(collections => collections.find(collection => collection))
      // console.log(recipe);
    }
    handleShowForm = (event) => {
      this.setState({
        showForm: true,
        showDetail: false
      })
    }

    handleMainPage =() => {
      this.props.history.push("/mainpage")
    }

    handleLogOut =(event) => {
      this.props.createUser(null)
      this.props.history.push("/")
      console.log(this.props.currentUserId)
    }

    handleProfile=() => {
      this.props.history.push("/profile")
    }


  render() {
      console.log(this.props.currentUser)
      return (
        <div>
          <Navbar handleLogOut={this.handleLogOut} handleProfile={this.handleProfile} handleMainPage={this.handleMainPage}/>
          <h1 className="banner">Let's Cook</h1>
          <Grid columns={2} padded='horizontally' className="Grid">
          <Grid.Column>
            <RecipeList
              handleShowDetail={this.handleShowDetail}
              userRecipes={this.state.userRecipes}
              userCollections={this.state.userCollections}
              handleDelete={this.handleDelete}
              handleShowForm={this.handleShowForm}
            />
          </Grid.Column>
            {this.state.showDetail?
             <Grid.Column>
               <RecipeDetail recipe={this.state.targetRecipe} />
             </Grid.Column>
               :
               null
             }
             {this.state.showForm?
               <Grid.Column>
                 <FormComponent handleFormSubmit={this.handleFormSubmit} />
               </Grid.Column>
                 :
                 null
               }
        </Grid>
      </div>
      );
  }

}

export default connect (state => ({currentUser: state.currentUser}), {createUser}) (Profile);
