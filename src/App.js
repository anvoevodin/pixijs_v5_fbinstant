import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Texture } from '@pixi/core'

import Button from './components/Button'

export default class App extends Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight
        })
        document.body.appendChild(this.view) // Put Canvas tag in the body

        this.init()

        window.addEventListener('resize', this.onResize.bind(this))
    }

    init() {
        this.loader.add('button', './assets/button.png')
        this.loader.load(this.draw.bind(this))
    }

    draw() {
        this.button1 = new Button({
            label: 'Play',
            width: 200,
            height: 80,
            onTap: () => console.log('Play')
        })
        this.button2 = new Button({
            label: 'Settings',
            width: 300,
            height: 110,
            onTap: () => console.log('Settings')
        })
        this.stage.addChild(this.button1, this.button2)
        this.onResize()
    }

    onResize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
        const width = this.renderer.width, height = this.renderer.height

        const btnMargin = 5
        this.button1.x = width * 0.5
        this.button1.y = height * 0.5 - this.button1.height * 0.5 - btnMargin

        this.button2.x = width * 0.5
        this.button2.y = height * 0.5 + this.button2.height * 0.5 + btnMargin
    }
}