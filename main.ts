input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (stobes == 0) {
        stobes = 1
    } else {
        stobes = 0
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        0,
        0
        )
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        0,
        0
        )
    }
})
input.onButtonPressed(Button.A, function () {
    if (display == 0) {
        display = 1
    } else {
        display = 0
    }
    music.play(music.createSoundExpression(WaveShape.Triangle, 784, 784, 255, 35, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    basic.pause(300)
    music.play(music.createSoundExpression(WaveShape.Triangle, 659, 659, 750, 15, 550, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
input.onGesture(Gesture.LogoUp, function () {
    stall = 1
})
input.onGesture(Gesture.TiltLeft, function () {
    bank_angle = 1
})
input.onGesture(Gesture.ScreenUp, function () {
    if (bank_angle || stall || pull_up == 1) {
        bank_angle = 0
        stall = 0
        pull_up = 0
        music.stopAllSounds()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (engines == 0) {
        engines = 1
        // Stage 1: Gentle fade-in from silence as air starter engages (0 -> 140)
        music.play(music.createSoundExpression(WaveShape.Triangle, 220, 320, 0, 140, 4500, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        // Stage 2: Fuel ignition & spool-up to full idle roar (140 -> 255)
        music.play(music.createSoundExpression(WaveShape.Sawtooth, 320, 520, 140, 255, 9999, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    } else {
        engines = 0
        // Stage 1: Turbine winds down in pitch (255 -> 130)
        music.play(music.createSoundExpression(WaveShape.Sawtooth, 520, 300, 255, 130, 4000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        // Stage 2: Gentle fade into silence (130 -> 0)
        music.play(music.createSoundExpression(WaveShape.Triangle, 300, 220, 130, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    }
})
input.onButtonPressed(Button.B, function () {
    if (landing == 0) {
        landing = 1
    } else {
        landing = 0
    }
})
input.onGesture(Gesture.TiltRight, function () {
    bank_angle = 1
})
input.onGesture(Gesture.LogoDown, function () {
    pull_up = 1
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (nav == 0) {
        nav = 1
    } else {
        nav = 0
    }
})
let outSpeed = 0
let servoSpeed = 0
let targetSpeed = 0
let low_gear = 0
let pull_up = 0
let stall = 0
let engines = 0
let display = 0
let bank_angle = 0
let nav = 0
let stobes = 0
let landing = 0
hummingbird.startHummingbird()
basic.clearScreen()
landing = 0
stobes = 0
nav = 0
bank_angle = 0
display = 0
engines = 0
basic.showLeds(`
    . . # . .
    . . # . .
    # # # # #
    . . # . .
    . # # # .
    `)
loops.everyInterval(0, function () {
    if (low_gear == 1) {
        music.play(music.createSoundExpression(WaveShape.Triangle, 784, 784, 255, 25, 260, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
        basic.pause(90)
        music.play(music.createSoundExpression(WaveShape.Triangle, 784, 784, 255, 25, 260, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
        basic.pause(1500)
    }
})
loops.everyInterval(0, function () {
    if (nav == 0) {
        hummingbird.setLED(ThreePort.One, 0)
        hummingbird.setLED(ThreePort.Two, 0)
    } else {
        hummingbird.setLED(ThreePort.One, 100)
        hummingbird.setLED(ThreePort.Two, 100)
    }
    if (landing == 0) {
        hummingbird.setLED(ThreePort.Three, 0)
    } else {
        hummingbird.setLED(ThreePort.Three, 100)
    }
})
loops.everyInterval(0, function () {
    if (engines > 0 && (landing == 0 && Math.round(hummingbird.getSensor(SensorType.Distance, ThreePort.Three) / 15) <= 1 && hummingbird.getSensor(SensorType.Light, ThreePort.Two) <= 2.5 && hummingbird.getSensor(SensorType.Distance, ThreePort.Three) > 7.62)) {
        low_gear = 1
    } else {
        low_gear = 0
    }
})
loops.everyInterval(0, function () {
    if (display == 1) {
        if (Math.round(hummingbird.getSensor(SensorType.Distance, ThreePort.Three) / 30) >= 9 && hummingbird.getSensor(SensorType.Dial, ThreePort.One) == 0) {
            basic.showNumber(0)
        } else {
            basic.showNumber(Math.round(hummingbird.getSensor(SensorType.Distance, ThreePort.Three) / 30))
        }
    } else {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . . # . .
            . # # # .
            `)
    }
})
loops.everyInterval(0, function () {
    if (bank_angle || stall || pull_up == 1) {
        music.play(music.createSoundExpression(WaveShape.Sine, 450, 1450, 255, 255, 220, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        basic.pause(90)
        music.play(music.createSoundExpression(WaveShape.Sine, 450, 1450, 255, 255, 220, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        basic.pause(650)
    }
})
loops.everyInterval(0, function () {
    if (stobes == 1) {
        hummingbird.setTriLED(
        TwoPort.One,
        100,
        100,
        100
        )
        hummingbird.setTriLED(
        TwoPort.Two,
        100,
        100,
        100
        )
        basic.pause(50)
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        0,
        0
        )
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        0,
        0
        )
        basic.pause(100)
        hummingbird.setTriLED(
        TwoPort.One,
        100,
        100,
        100
        )
        hummingbird.setTriLED(
        TwoPort.Two,
        100,
        100,
        100
        )
        basic.pause(50)
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        0,
        0
        )
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        0,
        0
        )
        basic.pause(1000)
    }
})
loops.everyInterval(60, function () {
    if (bank_angle == 1) {
        basic.showString("BANK")
    }
    if (stall == 1) {
        basic.showString("STALL")
    }
    if (pull_up == 1) {
        basic.showString("PULL")
    }
    if (low_gear == 1) {
        basic.showString("GEAR")
    }
})
loops.everyInterval(100, function () {
    // 1. Determine Target Speed
    if (engines == 1) {
        // Your original formula: Dial (0-100) + 50, capped at 100%
        targetSpeed = Math.min(100, hummingbird.getSensor(SensorType.Dial, ThreePort.One) + 50)
    } else {
        targetSpeed = 0
    }
    // 2. Smoothly Coast Up or Coast Down
    if (servoSpeed < targetSpeed) {
        if (servoSpeed < 10) {
            // Jump past the FS5103R 0-10% deadband/stutter zone right away
            servoSpeed = 10
        } else {
            // Takes ~14.5 seconds to climb from 10% to 50%+ (matches your 4500+9999ms startup sound)
            servoSpeed += 0.35
        }
        if (servoSpeed > targetSpeed) {
            servoSpeed = targetSpeed
        }
    } else if (servoSpeed > targetSpeed) {
        if (engines == 0) {
            // Takes ~5 seconds to drop from 50% down to 10% (matches your 4000+1000ms shutdown sound)
            servoSpeed += 0 - 0.85
        } else {
            // Normal throttle reduction while flying
            servoSpeed += 0 - 1.2
        }
        // Snap cleanly from 10% to 0% so FS5103R doesn't stutter at the end
        if (engines == 0 && servoSpeed <= 10) {
            servoSpeed = 0
        } else if (servoSpeed < targetSpeed) {
            servoSpeed = targetSpeed
        }
    }
    // 3. Send Rounded Speed to Both Engine Servos
    outSpeed = Math.round(servoSpeed)
    hummingbird.setRotationServo(FourPort.One, outSpeed)
    hummingbird.setRotationServo(FourPort.Two, outSpeed)
})
