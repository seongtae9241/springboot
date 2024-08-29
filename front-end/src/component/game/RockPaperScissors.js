import React, { Component } from 'react';
import '../../App.css';
import { TextField, Button } from '@mui/material';
import ApiService from '../../ApiService'; // ApiService import
import { withRouter } from 'react-router-dom'; // 페이지 이동을 위해 withRouter 사용

const choices = ['rock', 'paper', 'scissors'];

const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return 'draw';
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) return 'win';
    return 'lose';
};

class RockPaperScissors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userChoice: null,
            computerChoice: null,
            result: '',
            stats: {
                wins: 0,
                losses: 0,
                draws: 0
            },
            name: '',
            errorMessage: '' // 에러 메시지 상태 추가
        };
    }

     // 컴포넌트가 처음 화면에 렌더링된 직후에 실행
     componentDidMount() {
        this.loadRecord();
    }

    //1. 수정전에 1건 select
    loadRecord = () => {
        ApiService.fetchRecordById(window.localStorage.getItem("name"))
        .then(res => {
            let record = res.data;
            this.setState({
                stats: {
                    wins: record.win || 0,
                    losses: record.lose || 0,
                    draws: record.draw || 0
                },
                name: record.name
            })
        })
        .catch(err => {
            console.log('localRecord() Error!!', err);
        })
    }

    handleChoice = (choice) => {
        const compChoice = getRandomChoice();
        const gameResult = getResult(choice, compChoice);

        this.setState((prevState) => ({
            userChoice: choice,
            computerChoice: compChoice,
            result: gameResult,
            stats: {
                ...prevState.stats,
                wins: gameResult === 'win' ? prevState.stats.wins + 1 : prevState.stats.wins,
                losses: gameResult === 'lose' ? prevState.stats.losses + 1 : prevState.stats.losses,
                draws: gameResult === 'draw' ? prevState.stats.draws + 1 : prevState.stats.draws,
            }
        }));
    };

    saveRecord = () => {
        const { stats, name } = this.state;
        const winRate = stats.wins + stats.losses > 0
            ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(2)
            : 0;

        const inputDate = {
            win: stats.wins,
            lose: stats.losses,
            draw: stats.draws,
            winrate: winRate,
            name: name
        };

        if (!window.localStorage.getItem("name")) { // name이 null 또는 빈 문자열일 경우
            ApiService.addRecord(inputDate)
            .then(res => {
                console.log('addRecord() 성공 : ', res.data);
                // 성공 시 UserRecordComponent로 이동
                this.props.history.push('/record'); // 페이지 이동
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    // 409 Conflict 에러 시 (중복된 이름)
                    this.setState({ errorMessage: '사용할 수 없는 이름입니다' });
                } else {
                    console.log('addRecord() 에러!! : ', err);
                }
            });
        } else {
            ApiService.editRecord(inputDate)
            .then(res => {
                console.log('updateRecord() 성공 : ', res.data); //컨트롤러에서 전달함(resultCode, resultCode)
                this.props.history.push('/record'); // 페이지 이동
            })
            .catch(err => {
                console.log('updateRecord() 에러!! : ', err);
            });
        }

        
    };

    onChange = (e) => {
        this.setState({ name: e.target.value, errorMessage: '' }); // 사용자가 입력할 때 에러 메시지 초기화
    };

    render() {
        const { userChoice, computerChoice, result, stats, name, errorMessage } = this.state;
        const winRate = stats.wins + stats.losses > 0
            ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(2)
            : 0;

        return (
            <div className="game-container">
                <h1>Rock Paper Scissors</h1>
                <div className="buttons">
                    {choices.map((choice) => (
                        <Button
                            key={choice}
                            onClick={() => this.handleChoice(choice)}
                            variant="contained"
                            className={`choice-button ${choice}`}
                        >
                            {choice.charAt(0).toUpperCase() + choice.slice(1)}
                        </Button>
                    ))}
                </div>
                <div className="result">
                    {userChoice && <p>You chose: {userChoice}</p>}
                    {computerChoice && <p>Computer chose: {computerChoice}</p>}
                    {result && <h2>You {result}!</h2>}
                </div>
                <div className="stats">
                    <h3>Statistics</h3>
                    <p>Wins: {stats.wins}</p>
                    <p>Losses: {stats.losses}</p>
                    <p>Draws: {stats.draws}</p>
                    <p>Win Rate: {winRate}%</p>
                </div>

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Name"
                    type="text"
                    name="name"
                    value={name}
                    placeholder='Input your nickname'
                    onChange={this.onChange}
                    disabled={!!window.localStorage.getItem("name")} // localStorage에 값이 있으면 비활성화
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 에러 메시지 표시 */}
                <br /><br />
                <Button variant="contained" color="primary" onClick={this.saveRecord}> Save </Button>
            </div>
        );
    }
}

export default withRouter(RockPaperScissors);