import React from 'react';
import {Button,Image,List} from 'semantic-ui-react';
const Recipe = (props) => {
  return (

    <List.Item>
  <List.Content floated='right'>
    <Button onClick={ () => props.handleDelete(props.recipe)}>DELETE</Button>
  </List.Content>
   <Image avatar src={props.recipe.image} />
  <List.Content onClick={ () => props.handleShowDetail(props.recipe)}>{props.recipe.name}</List.Content>
</List.Item>


  )}

export default Recipe;
