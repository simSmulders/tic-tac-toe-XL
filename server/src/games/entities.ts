import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null, null, null, null]
const rowX: Row = ['x', 'x', 'o', 'x', 'x', 'x']
const rowO: Row = ['o', 'o', 'x', 'o', 'o', 'o']
const defaultBoard: Board = [ rowX, rowX, emptyRow, emptyRow, rowO, rowO ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: defaultBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

    @Column()
    userId: number

  @Column('char', {length: 1})
  symbol: Symbol
}


// import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
// import User from '../users/entity'

// // export type Color = 'red' | 'blue'
// // export type Pawn = {name: 'bomb', value: 0, team: 'red' | 'blue'} | null
// // export type Piece = {
// //   name: 'marshall',
// //   value: 3,
// //   team: 'red'|'blue'
// // } | {
// //   name: 'captain',
// //   value: 2,
// //   team: 'red'|'blue'
// // } | {
// //   name: 'soldier',
// //   value: 1,
// //   team: 'red'|'blue'
// // } | {
// //   name: 'bomb',
// //   value: 0,
// //   team: 'red'|'blue'
// // } | {
// //   name: 'flag',
// //   value: -1,
// //   team: 'red'|'blue'
// // }


// // export type Pieces = [Piece, Piece, Piece]
// // export type PiecesRedBlue = {red: Pieces, blue: Pieces}

// // export type Row = [Piece | Pawn | null, Piece | Pawn | null, 
// //                    Piece | Pawn | null, Piece | Pawn | null, 
// //                    Piece | Pawn | null, Piece | Pawn | null ]
// // export type Board = [Row, Row, Row, Row, Row, Row]


// // const row1: Row = [{name: 'marshall', value: 3, team: 'red'}, {name: 'flag', value: -1, team: 'red',}, {name: 'captain', value: 2, team: 'red'}, 
// //                     {name: 'soldier', value: 1, team: 'red'}, {name: 'captain', value: 2, team: 'red'}, {name: 'soldier', value: 1, team: 'red'}];
// // const row2: Row = [{name: 'captain', value: 2, team: 'red'}, {name: 'bomb', value: 0, team: 'red'}, {name: 'marshall', value: 3, team: 'red'}, 
// //                     {name: 'soldier', value: 1, team: 'red'}, {name: 'bomb', value: 0, team: 'red'}, {name: 'bomb', value: 0, team: 'red'}];
// // const emptyRow: Row = [null, null, null, null, null, null]
// // const row5: Row = [{name: 'soldier', value: 1, team: 'blue'}, {name: 'captain',value: 2, team: 'blue'}, {name: 'bomb', value: 0,  team: 'blue'}, 
// //                    {name: 'marshall', value: 3, team: 'blue'}, {name: 'bomb', value: 0, team: 'blue'}, {name: 'marshall', value: 3, team: 'blue'}]
// // const row6: Row = [{name: 'marshall', value: 3, team: 'blue'}, {name: 'soldier', value: 1, team: 'blue'}, {name: 'captain', value: 2, team: 'blue'}, 
// //                   {name: 'flag', value: -1, team: 'blue'}, {name: 'soldier', value: 1, team: 'blue'}, {name: 'captain', value: 2, team: 'blue'}]

// // const startBoard: Board = [ 
// //   row1, row2,emptyRow, emptyRow, row5, row6
// // ]

// type Status = 'pending' | 'started' | 'finished'

// @Entity()
// export class Game extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id?: number

//   @Column('json', {default: startBoard})
//   board: Board

//   @Column('text', {default: 'red'})
//   turn: Color

//   @Column('text', {nullable: true})
//   winner: Color

//   @Column('text', {default: 'pending'})
//   status: Status

//   // this is a relation, read more about them here:
//   // http://typeorm.io/#/many-to-one-one-to-many-relations
//   @OneToMany(_ => Player, player => player.game, {eager:true})
//   players: Player[]
// }

// @Entity()
// @Index(['game', 'user', 'color'], {unique:true})
// export class Player extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id?: number

//   @ManyToOne(_ => User, user => user.players)
//   user: User

//   @ManyToOne(_ => Game, game => game.players)
//   game: Game

//   @Column()
//   userId: number // comment these lines out when you start the game 

//   @Column('text',{nullable: true})
//   color: Color
// };
