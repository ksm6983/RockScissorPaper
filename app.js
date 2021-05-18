new Vue({
	el: "#app",
	data: {
		myChoice: null,
		comChoice: null,
		winner: null,
		count: 3,
		lifeOfMe: 3,
		lifeOfCom: 3,
		isSelectable: true,
		logs: [],
		selects: [
			{ name: "가위", value: "scissor"},
			{ name: "바위", value: "rock"},
			{ name: "보", value: "paper"},
		]
	},
	computed: {
		myChoiceImage: function() {
			/* if(this.myChoice === null) {
				return "images/question.jpg"
			} else {
				return "images/" + this.myChoice + ".jpg"
			} */

			return this.myChoice === null ? "images/question.jpg" : "images/" + this.myChoice + ".jpg"
		},
		myComImage: function() {
			return this.comChoice === null ? "images/question.jpg" : "images/" + this.comChoice + ".jpg"
		},
		leftLifeOfMe: function() {
			return 3 - this.lifeOfMe
		},
		leftLifeOfCom: function() {
			return 3 - this.lifeOfCom
		}
	},
	watch: {
		count: function(newVal) {
			if(newVal === 0) {
				// 컴퓨터의 가위바위보 결정
				this.selectCom()

				// 승패 결정
				this.choiceWin()

				// 값 리셋
				this.count = 3
				this.isSelectable = true

				// 로그
				this.updateLogs();
			}
		},
		lifeOfMe: function(newVal) {
			if(newVal === 0) {
				// 게임 종료
				this.endGame('안타깝네요. 당신이 패배하였습니다.')

			}
		},
		lifeOfCom: function(newVal) {
			if(newVal === 0) {
				// 게임 종료
				this.endGame('축하합니다! 당신이 승리하였습니다.')
			}
		},
	},
	methods: {
		startGame: function() {
			if(this.myChoice === null) {
				alert("가위, 바위, 보 중 하나를 선택해주세요.")
			} else {
				this.isSelectable = false

				let countDown = setInterval(() => {
					this.count --
					if(this.count === 0) {
						clearInterval(countDown)
					}
				}, 1000)
			}
		},
		selectCom: function() {
			let number = Math.random() * 100

			if(number < 33.3) {
				this.comChoice = "scissor";
			} else if(number < 66.6) {
				this.comChoice = "rock";
			} else {
				this.comChoice = "paper";
			}
		},
		choiceWin: function() {
			if(this.myChoice === this.comChoice) {
				this.winner = "no one"
			} else if(
				(this.myChoice === "rock" && this.comChoice === "scissor") ||
				(this.myChoice === "scissor" && this.comChoice === "paper") ||
				(this.myChoice === "paper" && this.comChoice === "rock")) {
				this.winner = "me"
			} else if(
				(this.comChoice === "rock" && this.myChoice === "scissor") ||
				(this.comChoice === "scissor" && this.myChoice === "paper") ||
				(this.comChoice === "paper" && this.myChoice === "rock")) {
				this.winner = "com"
			} else {
				this.winner = "error"
			}

			// 몫 차감
			if(this.winner === "me") {
				this.lifeOfCom --
			} else if(this.winner === "com") {
				this.lifeOfMe --
			}
		},
		updateLogs: function() {
			let log = {
				message: `YOU: ${this.myChoice}, Computer: ${this.comChoice}`,
				winner: this.winner
			}
			
			this.logs.unshift(log)
		},
		endGame: function(message) {
			setTimeout(() => {
				confirm(message)

				// 값 초기화
				this.lifeOfMe = 3
				this.lifeOfCom = 3
				this.myChoice = null,
				this.comChoice = null,
				this.winner = null,
				this.logs = []
			}, 500)
		}
	}
})