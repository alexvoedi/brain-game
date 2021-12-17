import Cell from './Cell'

export default class Player extends Cell {
	constructor(x: number, y: number) {
		super(x, y)
		this.color = 'darkred'
	}
}
