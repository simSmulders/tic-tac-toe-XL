import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      theRow: -1,
      theCell: -1,
    }
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  selectUnit = (toRow, toCell) => {
    console.log('selectUnit', toRow, toCell)
    const {game} = this.props
    if (game.board[toRow][toCell] === null) {
      return 
    } else if (game.board[toRow][toCell] !== game.turn) {
      return
    } else if (game.board[toRow][toCell] === game.turn) {
      return this.setState({
        theRow: toRow, 
        theCell: toCell,
      })
    } 
  }

  makeMove = (toRow, toCell) => {
    console.log('make Move', toRow, toCell)
    const {game, updateGame} = this.props

    if (game.board[toRow][toCell] === null) {
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.board[this.state.theRow][this.state.theCell]
        else if (rowIndex === this.state.theRow &&
        cellIndex === this.state.theCell) return null
        else return cell
      })
    )


    updateGame(game.id, board)
    this.setState({
      theRow: -1,
      theCell: -1
    })
  }
}



  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p> &&
        alert(`${users[winner].firstName} has won`)
        
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} selectUnit={this.selectUnit} makeMove={this.makeMove} theState={this.state}/>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
