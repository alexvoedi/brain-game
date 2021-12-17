import Cell from './Cell'

export default class Goal extends Cell {
	constructor(x: number, y: number) {
		super(x, y)
		this.color = 'gray'
	}
}
