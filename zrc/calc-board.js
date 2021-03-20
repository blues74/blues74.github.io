class CalcBoard {
    constructor($vc) {
        this.$el = null;
        this.$vc = $vc;
    }

    init($el) {
        this.$el = $el;
        const $app = this.$vc.$app;
        const $route = this.$vc.$route;
        // this.initContentsList($el);

        console.log(this.$el);

        dyName('xTest', this.$el).on('click', (e) => {
            const context = new AudioContext()
            const masterGainNode = context.createGain()
            masterGainNode.gain.value = 1            

            const oscillator = context.createOscillator()

            oscillator.frequency.value = 400
            oscillator.type = 'sine'
            
            masterGainNode.connect(context.destination)
            oscillator.connect(masterGainNode)
            
            oscillator.start(context.currentTime)
            
            setTimeout(() => {
                oscillator.stop(context.currentTime)
                // cb && cb()
            }, 1000)

            console.log('xTest', e);
        });        
    }
}
