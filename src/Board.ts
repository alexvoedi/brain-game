import Cell from './Cell'
import Wall from './Wall'
import Player from './Player'
import Goal from './Goal'

export default class Board {

	static cellSize = Math.floor(window.innerHeight / 15)

	cells: Array<Cell>
	player: Player
	goal: Goal
	currentBoard: string[][]
	minNeededMoves: number

	constructor(level: number) {
		this.currentBoard = boards[Math.floor(level / 30)]
		this.loadBoard()
		this.addPlayer()
		this.addGoal()
		this.calculateMinNeededMoves()
	}

	loadBoard(): void {
		this.cells = []
		for (let x = 0; x < this.currentBoard.length; x++) {
			for (let y = 0; y < this.currentBoard[x].length; y++) {
				const cell = this.currentBoard[x][y]
				if (cell === 'W') {
					this.cells.push(new Wall(x, y))
				}
			}
		}
	}

	addPlayer(): void {
		let x, y
		do {
			x = Math.floor(Math.random() * this.currentBoard.length)
			y = Math.floor(Math.random() * this.currentBoard[x].length)
		} while (this.currentBoard[x][y] !== 'F')

		this.player = new Player(x, y)

		this.cells.push(this.player)
	}

	addGoal(): void {
		let x, y
		do {
			x = Math.floor(Math.random() * this.currentBoard.length)
			y = Math.floor(Math.random() * this.currentBoard[x].length)
		} while (this.currentBoard[x][y] !== 'F')

		this.goal = new Goal(x, y)

		this.cells.push(this.goal)
	}

	calculateMinNeededMoves(): void {
		this.minNeededMoves = Math.abs(this.player.x - this.goal.x) + Math.abs(this.player.y - this.goal.y)
	}
}

// LIST OF BOARDS
const boards = [
	[
		['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
	],
	[
		['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
		['W', 'F', 'F', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'W'],
		['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
	],
]
