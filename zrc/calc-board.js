const soundNames = [
    'ды', 'жы', 'ры', 'пы', 'мы', 'фы', 'ты', 'сы', 'ны', 'лы', 'кы', 'бы', // большая
    'ду', 'жу', 'ру', 'пу', 'му', 'фу', 'ту', 'су', 'ну', 'лу', 'ку', 'бу', // малая
    'до', 'жо', 'ро', 'по', 'мо', 'фо', 'то', 'со', 'но', 'ло', 'ко', 'бо', // первая
    'да', 'жа', 'ра', 'па', 'ма', 'фа', 'та', 'са', 'на', 'ла', 'ка', 'ба', // вторая
    'дэ', 'жэ', 'рэ', 'пэ', 'мэ', 'фэ', 'тэ', 'сэ', 'нэ', 'лэ', 'кэ', 'бэ', // третья
]

const replaceSound = {
    'ды': 'до',
    'жы': 'жо',
    'ры': 'ро',
    'пы': 'по',
    'мы': 'мо',
    'фы': 'фо',
    'ты': 'то',
    'сы': 'со',
    'ны': 'но',
    'лы': 'ло',
    'кы': 'ко',
    'бы': 'бо',

    'ду': 'до',
    'жу': 'жо',
    'ру': 'ро',
    'пу': 'по',
    'му': 'мо',
    'фу': 'фо',
    'ту': 'то',
    'су': 'со',
    'ну': 'но',
    'лу': 'ло',
    'ку': 'ко',
    'бу': 'бо',

    'дэ': 'до',
    'жэ': 'жо',
    'рэ': 'ро',
    'пэ': 'по',
    'мэ': 'мо',
    'фэ': 'фо',
    'тэ': 'то',
    'сэ': 'со',
    'нэ': 'но',
    'лэ': 'ло',
    'кэ': 'ко',
    'бэ': 'бо',    
}

const freqList = [
    /* БОЛЬШАЯ */
	{name: 'ды', value: 65.41},
	{name: 'жы', value: 69.30},
	{name: 'ры', value: 73.91},    
	{name: 'пы', value: 77.78},
	{name: 'мы', value: 82.41},
	{name: 'фы', value: 87.31},
	{name: 'ты', value: 92.50},    
	{name: 'сы', value: 98.00},
	{name: 'ны', value: 103.80},
	{name: 'лы', value: 110.00},
	{name: 'кы', value: 116.54},
	{name: 'бы', value: 123.48},    
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
	{name: 'дэ', value: 523.25},
	{name: 'жэ', value: 554.36},
	{name: 'рэ', value: 587.32},
	{name: 'пэ', value: 622.26},
	{name: 'мэ', value: 659.26},
	{name: 'фэ', value: 698.46},
	{name: 'тэ', value: 739.98},
	{name: 'сэ', value: 784.00},
	{name: 'нэ', value: 830.60},
	{name: 'лэ', value: 880.00},
	{name: 'кэ', value: 932.32},
	{name: 'бэ', value: 987.75},
    /* ТРЕТЬЯ */
	{name: 'да', value: 1046.5},
	{name: 'жа', value: 1108.70},
	{name: 'ра', value: 1174.60},
	{name: 'па', value: 1244.50},
	{name: 'ма', value: 1318.50},
	{name: 'фа', value: 1396.90},
	{name: 'та', value: 1480.00},
	{name: 'са', value: 1568.00},
	{name: 'на', value: 1661.20},
	{name: 'ла', value: 1720.00},
	{name: 'ка', value: 1864.60},
	{name: 'ба', value: 1975.50},    
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

            console.log('sound', sound, onlyStop);

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
            } else if (/а/.test(sound) || /э/.test(sound) || /и/.test(sound)) {
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
