import Board from './Board'
import Wall from './Wall'

export default class Game {

	debug = true

	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D

	board: Board
	shuffle: (direction: number) => number

	level: number
	score: number
	moves: number
	moveAttempts: number
	startTime: number

	constructor(container: string) {
		this.canvas = document.querySelector(container)
		this.ctx = this.canvas.getContext('2d')

		this.level = 1
		this.score = 0

		window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyPress(e))

		this.initBoard()
	}

	initBoard(): void {
		this.moves = 0
		this.moveAttempts = 0
		this.board = new Board(this.level)

		// select shuffle
		const difficulty = Math.min(Math.floor((this.level - 1) / 3), this.shuffles.length - 1) % 30
		const shuffle = Math.floor(Math.random() * this.shuffles[difficulty].length)
		this.shuffle = this.shuffles[difficulty][shuffle]

		this.startTime = Date.now()

		this.render()
	}

	render(): void {
		this.ctx.canvas.width = 10 * Board.cellSize
		this.ctx.canvas.height = 10 * Board.cellSize

		this.board.cells.forEach((cell) => {
			this.ctx.fillStyle = cell.color
			this.ctx.fillRect(cell.x * Board.cellSize, cell.y * Board.cellSize, Board.cellSize, Board.cellSize)
		})

		document.querySelector('#min-needed-moves').innerHTML = String(this.board.minNeededMoves)
		document.querySelector('#level').innerHTML = String(this.level)
		document.querySelector('#moves').innerHTML = String(this.moves)
		document.querySelector('#move-attempts').innerHTML = String(this.moveAttempts)
		document.querySelector('#score').innerHTML = String(this.score)
	}

	onKeyPress(e: KeyboardEvent): void {

		let direction

		if (e.keyCode === 38) {
			direction = 0
		}
		else if (e.keyCode === 40) {
			direction = 2
		}
		else if (e.keyCode === 37) {
			direction = 3
		}
		else if (e.keyCode === 39) {
			direction = 1
		} else {
			return
		}

		this.move(direction)
		this.winCheck()
		this.render()
	}

	move(direction: number): void {

		const target = { x: this.board.player.x, y: this.board.player.y }

		direction = this.shuffle(direction)

		if (direction === 0) {
			target.y--
		} else if (direction === 2) {
			target.y++
		} else if (direction === 3) {
			target.x--
		} else if (direction === 1) {
			target.x++
		}

		if (!this.collisionDetection(target)) {
			this.board.player.x = target.x
			this.board.player.y = target.y
			this.moves++
		} else {
			this.moveAttempts++
		}
	}

	collisionDetection(target: { x: number; y: number }): boolean {

		const targetCell = this.board.cells.find((cell) => cell.x === target.x && cell.y === target.y)

		if (targetCell instanceof Wall) {
			return true
		} else {
			return false
		}
	}

	winCheck(): void {
		if (this.board.player.x === this.board.goal.x && this.board.player.y === this.board.goal.y) {

			const time = Math.floor((Date.now() - this.startTime) / 1000)

			const difficulty = this.level + 1

			this.score += (0.5 * this.board.minNeededMoves * difficulty)
			this.score += (5 - time)
			this.score -= (this.moves)
			this.score -= (0.5 * this.moveAttempts)
			this.score = Number(this.score.toFixed(2))

			this.level++
			this.initBoard()
		}
	}

	shuffles = [
		[
			// difficulty 1
			(dir: number): number => {
				return dir
			},
		],
		[
			// difficulty 2
			(dir: number): number => {
				return (dir + 2) % 4
			},
			(dir: number): number => {
				if (dir === 0) {
					return 2
				} else if (dir === 2) {
					return 0
				} else {
					return dir
				}
			},
			(dir: number): number => {
				if (dir === 1) {
					return 3
				} else if (dir === 3) {
					return 1
				} else {
					return dir
				}
			},
		],
		[
			// difficulty 3
			(dir: number): number => {
				return (dir + 1) % 4
			},
			(dir: number): number => {
				return (dir + 3) % 4
			},
		],
		[
			// difficulty 4
			(dir: number): number => {
				return (dir + this.moves) % 4
			},
		],
		[
			// difficulty 5
			(dir: number): number => {
				return (dir + 2 * this.moves) % 4
			},
		],
		[
			// difficulty 6
			(dir: number): number => {
				return (dir * this.moves) % 4
			},
		],
	]
}
