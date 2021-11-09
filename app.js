new Vue({
	el: '#app',
	data: {
		player: {
            name: 'Player', life: 100
        },
        monster: {
            name: 'Monster', life: 100
        },
        isGameRunning: false,

	},
    computed: {
        hasResult() {
            return this.player.life == 0 || this.monster.life == 0
        }
    },
	methods: {
        startGame() {
            this.isGameRunning = true
            this.player.life = 100
            this.monster.life = 100
        },
        attack(special) {
            console.log(special, this.getRandom(5, 10))
            this.hurt(7, 12, false)
        },
        hurt(min, max, special) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this.player.life = Math.max(this.player.life - hurt, 0)
        },
        getRandom(min, max) {
            const value = Math.random() * (max -min) + min
            return Math.round(value)
        }
	},
    watch: {

    }
})