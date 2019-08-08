import { Texture } from '@pixi/core'
import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text } from '@pixi/text'

export default class Button extends NineSlicePlane {
    constructor(settings) {
        const texture = Texture.from('button')
        const notScalableArea = 20 // Indent from left, top, right and bottom sides in pixels
        super(texture, notScalableArea, notScalableArea, notScalableArea, notScalableArea)

        /** Contains settings for the button */
        this.settings = {
            // Default values
            width: 200,
            height: 100,

            fontSize: 35,
            label: 'Button',
            stroke: '#336699',
            strokeThickness: 4,
            tint: 0xFFFFFF,

            overTint: 0xDDDDDD,
            activeTint: 0xAAAAAA,

            overStroke: '#225588',
            activeStroke: '#114477'
        }

        // The button's state.
        /** Whether the cursor is over the button */
        this.isOver = false
        /** Whether we pressed on the button but didn't released yet */
        this.isActive = false

        // Main text on the button
        this.label = new Text('')
        this.label.anchor.set(0.5)
        this.addChild(this.label)

        // Update visual appearance
        this.update(settings)

        // We want the button to be able to interact with pointer events, so we set this.interactive true
        this.interactive = true
        // Show the "hand-cursor" when the cursor is over the button
        this.buttonMode = true

        /** Bind functions on this context as long as we will use them as event handlers */
        this.onTap = this.onTap.bind(this)
        this.onOver = this.onOver.bind(this)
        this.onOut = this.onOut.bind(this)
        this.onDown = this.onDown.bind(this)
        this.onUp = this.onUp.bind(this)

        this.on('pointertap', this.onTap) // The moment when we release (click/tap) the button
        this.on('pointerover', this.onOver) // The moment when we put the cursor over the button
        this.on('pointerout', this.onOut) // The moment when we put the cursor out of the button
        this.on('pointerdown', this.onDown) // The moment when we pressed on the button but didn't release yet
        this.on('pointerup', this.onUp) // The moment when we release the button
        this.on('pointerupoutside', this.onUp) // The moment when we release the button being outside of it (e.g. we press on the button, move the cursor out of it, and release)
    }

    onTap() {
        if (this.settings.onTap) this.settings.onTap()
    }

    onOver() {
        this.isOver = true
        this.update()
    }

    onOut() {
        this.isOver = false
        this.update()
    }

    onDown() {
        this.isActive = true
        this.update()
    }

    onUp() {
        this.isActive = false
        this.update()
    }

    /** Updates the button's appearance after changing its settings */
    update(settings) {
        // Creating new settings which include old ones and apply new ones over it
        this.settings = {
            ...this.settings, // including old settings
            ...settings, // including new settings
        }

        let stroke = this.settings.stroke
        if (this.isActive === true) {
            this.tint = this.settings.activeTint
            stroke = this.settings.activeStroke
        } else if (this.isOver === true) {
            this.tint = this.settings.overTint
            stroke = this.settings.overStroke
        } else {
            this.tint = this.settings.tint
        }

        this.label.text = this.settings.label
        this.label.style = {
            fontSize: this.settings.fontSize + 'px',
            fill: '#ffffff',
            stroke: stroke,
            strokeThickness: this.settings.strokeThickness,
        }

        this.onResize()
    }

    /** Changes sizes and positions each time when the button updates */
    onResize() {
        this.width = this.settings.width
        this.height = this.settings.height

        this.label.x = this.width * 0.5
        this.label.y = this.height * 0.5

        this.pivot.set(this.width * 0.5, this.height * 0.5)
    }
}