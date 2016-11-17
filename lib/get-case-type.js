'use strict'

module.exports = (item) => {
  var type = 'tilskudd-folkehelse'

  if (item.artform && item.artform.artform && item.artform.artform === 'Billedkunst') {
    type = 'tilskudd-kultur-billedkunst'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Film') {
    type = 'tilskudd-kultur-film'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Idrett') {
    type = 'tilskudd-idrett'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Kulturarv') {
    type = 'tilskudd-kultur-kulturarv'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Litteratur') {
    type = 'tilskudd-kultur-litteratur'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Musikk') {
    type = 'tilskudd-kultur-musikk'
  }

  if (item.artform && item.artform.artform && item.artform.artform === 'Scenekunst') {
    type = 'tilskudd-kultur-scenekunst'
  }

  return type
}
