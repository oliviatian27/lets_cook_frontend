import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Grid }from "semantic-ui-react"

const styles = theme => ({
  card: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }

});


class Result extends Component {
  state={
    expanded: false,
    isFavorited: false
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleFavorite = (event) => {
    console.log(this.props.recipe)
    const ingredients = this.props.recipe.ingredients.map(ingredient => ingredient.text)
    fetch(`https://letscook-api.herokuapp.com/users/1/recipes`, {
      method:"POST",
      headers:{
        "Accept":"Application/json",
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({
        user_id: 1,//fix user id to 1,recipes from api
        name: this.props.recipe.label,
        image: this.props.recipe.image,
        calories: Number(this.props.recipe.calories),
        cooking_time: Number(this.props.recipe.cooking_time),
        ingredients: ingredients
      })
    }).then(res=>res.json())
    .then(newRecipe=> {
      fetch(`https://letscook-api.herokuapp.com/users/${this.props.currentUser.id}/collections`,{
      method:"POST",
      headers:{
        "Accept":"Application/json",
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({
        collector_id: this.props.currentUser.id,
        recipe_id: newRecipe.id
    })
  }).then(response=> response.json())
  .then(console.log)
  this.setState({
    isFavorited: true
  })
})
}
render(){
console.log(this.props.recipe);
console.log(this.props.currentUser);

    const { classes } = this.props;
   return (
   <Grid.Column>
     <Card className={classes.card}>
       <CardHeader


         title={this.props.recipe.label}

         />
       <CardMedia
         className={classes.media}
         image={this.props.recipe.image}
         title="Contemplative Reptile"
         />
       <CardContent>
         <Typography component="p">
           Health Labels: {this.props.recipe.healthLabels.join(', ')}
         </Typography>
       </CardContent>
       <CardActions className={classes.actions} disableActionSpacing>
         <IconButton aria-label="Add to favorites"  onClick={this.handleFavorite} style={this.state.isFavorited? {color:'red'} :null}>
           <FavoriteIcon />
         </IconButton>

         <IconButton
           className={classnames(classes.expand, {
             [classes.expandOpen]: this.state.expanded,
           })}
           onClick={this.handleExpandClick}
           aria-expanded={this.state.expanded}
           aria-label="Show more"
         >
           <ExpandMoreIcon />
         </IconButton>
       </CardActions>
       <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
         <CardContent>
           <Typography paragraph>Ingredients:</Typography>
           <Typography paragraph>
             {this.props.recipe.ingredients.map(ingredient=>{
               return ingredient.text
             }).join(', ')}
           </Typography>
           <Typography paragraph>
            <div> <a href={this.props.recipe.url} target="_blank">Recipe Instructions</a></div>
           </Typography>

         </CardContent>
       </Collapse>
     </Card>
   </Grid.Column>
   )
 }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect (state => ({currentUser: state.currentUser})) (withStyles(styles)(Result))
