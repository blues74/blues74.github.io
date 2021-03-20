const soundNames = [
    'ду', 'жу', 'ру', 'пу', 'му', 'фу', 'ту', 'су', 'ну', 'лу', 'ку', 'бу',
    'до', 'жо', 'ро', 'по', 'мо', 'фо', 'то', 'со', 'но', 'ло', 'ко', 'бо',
    'да', 'жа', 'ра', 'па', 'ма', 'фа', 'та', 'са', 'на', 'ла', 'ка', 'ба',
]

// ду жу ру пу   до жо ро по   да жа ра па
// му фу ту су   мо фо то со   ма фа та са
// ну лу ку бу   но ло ко бо   на ла ка ба

const freqList = [
    /* МАЛАЯ */
	{name: 'ду', value: 130.82},
	{name: 'жу', value: 138.59},
	{name: 'ру', value: 147.83},    
	{name: 'пу', value: 155.56},
	{name: 'му', value: 164.81},
	{name: 'фу', value: 174.62},
	{name: 'ту', value: 185.00},    
	{name: 'су', value: 196.00},
	{name: 'ну', value: 207.00},
	{name: 'лу', value: 220.00},
	{name: 'ку', value: 233.08},
	{name: 'бу', value: 246.96},
    /* ПЕРВАЯ */
	{name: 'до', value: 261.63},
	{name: 'жо', value: 277.18},
	{name: 'ро', value: 293.66},
	{name: 'по', value: 311.13},
	{name: 'мо', value: 329.63},
	{name: 'фо', value: 349.23},
	{name: 'то', value: 369.99},
	{name: 'со', value: 392.00},
	{name: 'но', value: 415.30},
	{name: 'ло', value: 440.00},
	{name: 'ко', value: 466.16},
	{name: 'бо', value: 493.88},
    /* ВТОРАЯ */
	{name: 'да', value: 523.25},
	{name: 'жа', value: 554.36},
	{name: 'ра', value: 587.32},
	{name: 'па', value: 622.26},
	{name: 'ма', value: 659.26},
	{name: 'фа', value: 698.46},
	{name: 'та', value: 739.98},
	{name: 'са', value: 784.00},
	{name: 'на', value: 830.60},
	{name: 'ла', value: 880.00},
	{name: 'ка', value: 932.32},
	{name: 'ба', value: 987.75},
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
        // const masterGainNode = context.createGain()

        const yVolume = context.createGain()
        const oVolume = context.createGain()
        const aVolume = context.createGain()                

        yVolume.gain.value = 1
        oVolume.gain.value = .4
        aVolume.gain.value = .2

        yVolume.connect(context.destination)
        oVolume.connect(context.destination)
        aVolume.connect(context.destination)

        // masterGainNode.gain.value = 1
        // masterGainNode.connect(context.destination)

        let currOscil
        let currSound
        let currVolume

        const playSound = (sound, onlyStop) => {
            console.log('sound', sound, onlyStop);

            if (onlyStop && currSound !== sound) {
                return
            }

            if (currOscil) {
                // curr.stop(context.currentTime)
                currOscil.disconnect()
                currOscil = null
                currSound = null
            }

            if (onlyStop) {
                return
            }            

            if (!soundBy[sound]) {
                const oscil = context.createOscillator()
                oscil.type = 'sine'
                oscil.frequency.value = freqHash[sound.toLowerCase()]
                oscil.start(context.currentTime)
                soundBy[sound] = oscil
            }

            currVolume = yVolume

            if (/о/.test(sound)) {
                currVolume = oVolume
            } else if (/а/.test(sound)) {
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
}
