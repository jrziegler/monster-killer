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
        logs: []
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
            this.hurt('monster', 5, 10, special, this.player.name, 'player')

            if (this.monster.life > 0) {
                this.hurt('player', 7, 12, false, this.monster.name, 'monster')
            }
        },
        hurt(opponent, min, max, special, source, cls) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[opponent].life = Math.max(this[opponent].life - hurt, 0)
            this.registerLog(`${source} hits ${this[opponent].name} with ${hurt}.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('player', 7, 12, false)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.player.life = Math.min(this.player.life + heal, 100)
        },
        getRandom(min, max) {
            const value = Math.random() * (max -min) + min
            return Math.round(value)
        },
        registerLog(msg, cls) {
            this.logs.unshift({msg, cls})
        }
	},
    watch: {
        hasResult(value) {
            if (value == true)
                this.isGameRunning = false
        }
    }
})