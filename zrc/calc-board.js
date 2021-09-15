const soundNames = [
    'ду', 'ту', 'ру', 'ну', 'му', 'фу', 'ву', 'су', 'зу', 'лу', 'ку', 'бу', // большая
    'до', 'то', 'ро', 'но', 'мо', 'фо', 'во', 'со', 'зо', 'ло', 'ко', 'бо', // малая
    'да', 'та', 'ра', 'на', 'ма', 'фа', 'ва', 'са', 'за', 'ла', 'ка', 'ба', // первая
    'де', 'те', 'ре', 'не', 'ме', 'фе', 'ве', 'се', 'зе', 'ле', 'ке', 'бе', // вторая
]

const replaceSound = {}

const freqList = [
    /* БОЛЬШАЯ */
    { name: 'ду', value: 65.41 },
    { name: 'ту', value: 69.3 },
    { name: 'ру', value: 73.42 }, // 73.91
    { name: 'ну', value: 77.78 },
    { name: 'му', value: 82.41 },
    { name: 'фу', value: 87.31 },
    { name: 'ву', value: 92.5 },
    { name: 'су', value: 98.0 },
    { name: 'зу', value: 103.83 },
    { name: 'лу', value: 110.0 }, // purple
    { name: 'ку', value: 116.54 },
    { name: 'бу', value: 123.47 },
    /* МАЛАЯ */
    { name: 'до', value: 130.82 },
    { name: 'то', value: 138.59 },
    { name: 'ро', value: 146.83 },
    { name: 'но', value: 155.57 },
    { name: 'мо', value: 164.82 },
    { name: 'фо', value: 174.62 },
    { name: 'во', value: 185.0 },
    { name: 'со', value: 196.0 },
    { name: 'зо', value: 207.65 },
    { name: 'ло', value: 220.0 },
    { name: 'ко', value: 233.08 },
    { name: 'бо', value: 246.94 },
    /* ПЕРВАЯ */
    { name: 'да', value: 261.63 },
    { name: 'та', value: 277.18 },
    { name: 'ра', value: 293.66 },
    { name: 'на', value: 311.13 },
    { name: 'ма', value: 329.63 },
    { name: 'фа', value: 349.23 },
    { name: 'ва', value: 369.99 },
    { name: 'са', value: 392.0 },
    { name: 'за', value: 415.3 },
    { name: 'ла', value: 440.0 }, // yellow
    { name: 'ка', value: 466.16 },
    { name: 'ба', value: 493.88 },
    /* ВТОРАЯ */
    { name: 'де', value: 523.26 },
    { name: 'те', value: 554.36 },
    { name: 'ре', value: 587.32 },
    { name: 'не', value: 622.26 },
    { name: 'ме', value: 659.26 },
    { name: 'фе', value: 698.46 },
    { name: 'ве', value: 739.98 },
    { name: 'се', value: 784.0 },
    { name: 'зе', value: 830.6 },
    { name: 'ле', value: 880.0 },
    { name: 'ке', value: 932.32 },
    { name: 'бе', value: 987.76 },
];

const freqHash = freqList.reduce((acc, item) => {
    acc[item.name] = item.value
    return acc
}, {})

class CalcBoard {
    constructor($vc) {
        this.$el = null;
        this.$vc = $vc;
    }

    init($el) {
        this.$el = $el;
        const $app = this.$vc.$app;
        const $route = this.$vc.$route;

        const soundBy = {};
        const context = new AudioContext()
        const yVolume = context.createGain()
        const oVolume = context.createGain()
        const aVolume = context.createGain()                
        let currOscil
        let currSound
        let currVolume

        yVolume.gain.value = 1
        oVolume.gain.value = .4
        aVolume.gain.value = .1

        yVolume.connect(context.destination)
        oVolume.connect(context.destination)
        aVolume.connect(context.destination)

        const playSound = (sound, onlyStop) => {
            sound = (sound || '').toLowerCase()
            sound = replaceSound[sound] || sound

            if (!freqHash[sound]) {
                return
            }

            if (onlyStop && currSound !== sound) {
                return
            }

            if (currOscil) {
                // curr.stop(context.currentTime)
                currOscil.disconnect()
                currOscil = null
                currSound = null
                currVolume = null
            }

            if (onlyStop) {
                return
            }

            if (!soundBy[sound]) {
                const oscil = context.createOscillator()
                oscil.type = 'sine'
                oscil.frequency.value = freqHash[sound]
                oscil.start(context.currentTime)
                soundBy[sound] = oscil
            }

            currVolume = yVolume

            if (/о/.test(sound)) {
                currVolume = oVolume
            } else if (/а/.test(sound) || /е/.test(sound) || /и/.test(sound)) {
                currVolume = aVolume
            }

            currSound = sound
            currOscil = soundBy[sound]
            currOscil.connect(currVolume)
            // currOscil.connect(masterGainNode)
        }

        _.each(this.$el.find(`button`), btn => {
            const sound = btn.innerText.toLowerCase();

            // $(btn).on('mousedown', (e) => {
            //     console.log('mousedown')
            //     playSound(sound)
            // });

            btn.addEventListener('touchstart', () => {
                playSound(sound)
            });

            // $(btn).on('touchstart', (e) => {
            //     console.log('touchstart')
            //     playSound(sound)
            // });            

            // $(btn).on('mouseup', (e) => {
            //     console.log('mouseup')
            //     playSound(sound, true)                
            // });

            // $(btn).on('touchend', (e) => {
            //     console.log('touchend')
            //     playSound(sound, true)                
            // });
            
            btn.addEventListener('touchend', () => {
                playSound(sound, true)
            });

        });
    }

    bindPanel() {

    }
}
