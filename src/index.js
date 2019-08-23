// Import Application class that is the main part of our PIXI project
import { Application } from '@pixi/app'

// In order that PIXI could render things we need to register appropriate plugins
import { Renderer } from '@pixi/core' // Renderer is the class that is going to register plugins

import { BatchRenderer } from '@pixi/core' // BatchRenderer is the "plugin" for drawing sprites
Renderer.registerPlugin('batch', BatchRenderer)

import { TilingSpriteRenderer } from '@pixi/sprite-tiling' // TilingSpriteRenderer is the plugin for drawing tiling sprites, which is the key solution for our "endless sprites" task
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer)

import { TickerPlugin } from '@pixi/ticker' // TickerPlugin is the plugin for running an update loop (it's for the application class)
Application.registerPlugin(TickerPlugin)

// And just for convenience let's register Loader plugin in order to use it right from Application instance like app.loader.add(..) etc.
import { AppLoaderPlugin } from '@pixi/loaders'
Application.registerPlugin(AppLoaderPlugin)

import App from './App'

// Wait for the page to load to be sure that FBInstant is already ready to be used
window.onload = async () => {
    await FBInstant.initializeAsync()
    const app = new App()
    await app.init(FBInstant.setLoadingProgress)
    await FBInstant.startGameAsync() // We say to FBInstant that "everything is loaded and the game is ready to run, so FB lib, please, be prepared as well" :)
    
    // At this point everything (your game and FB) is ready and we can start rendering the game
    app.draw()
}