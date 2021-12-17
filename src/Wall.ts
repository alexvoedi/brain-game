import Cell from './Cell'

export default class Wall extends Cell {
	constructor(x: number, y: number) {
		super(x, y)
		this.color = 'black'
	}
}
