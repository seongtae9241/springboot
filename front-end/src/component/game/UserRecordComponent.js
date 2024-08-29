import React, {Component} from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, Typography, Button} from '@mui/material';
import ApiService from '../../ApiService';
import {Create, Delete} from  '@mui/icons-material';  // npm install -f @mui/icons-material@^5.11.16

class UserRecordComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            records: [],   // 5. 리스트 데이터
            message: null
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기 전까지의 전체 과정을 렌더링(데이터 로딩) 
    componentDidMount() {    // 1.
        this.reloadRecordList();
    }

    // list
    reloadRecordList = () => {
        ApiService.fetchRecords()  // 2. 스프링부트와의 통신기능 호출
            .then(res => {   // 4. res에 DB 결과가 들어있다.
                this.setState({
                    records: res.data
                })
            })
            .catch(err => {
                console.log('reloadRecordList() Error', err)
            })
    }

    // insert
    playgame = () => {
        window.localStorage.removeItem("name"); //SQL에서 max+1로 자동증가 하므로

        // history.push()로 페이지 이동시 props값 전달
        this.props.history.push("/game")

    } 

    // update
    editRecord = (name) => {
        window.localStorage.setItem("name", name); //SQL에서 max+1로 자동증가 하므로
        this.props.history.push("/game") //RouterComponent - EditRecordComponent 호출
    }

    // delete
    deleteRecord = (Name) => {
        ApiService.deleteRecord(Name)
            .then(res => {
                this.setState({
                    // 리액트에서 특정아이템을 삭제할때는 불변성을 지켜가면 update해줘야한다. 이때 filter라는 함수를 사용한다.
                    // filter는 배열에서 특정조건이 만족하는 요소들만 추출하여 새로운 값을 만든다.
                    // filter 함수를 통해 조건이 만족하지 않으면 배열의 요소를 제거한다.
                    records: this.state.records.filter(record => record.name !== Name)
                });
                console.log('delete 성공 : ', res.date);
            })
            .catch(err => {
                console.log('deletRecord() Error', err);
            })
    }

    render() {
        return(
            <div>
                <br/><br/>
                <h3>UserRecordComponent</h3>

                <Typography variant="h4" style={style}> Record List </Typography> <br/><br/>
                <Button variant="contained" color="primary" onClick={this.playgame}> Play Game </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> Win </TableCell>
                            <TableCell> Lose </TableCell>
                            <TableCell> Draw </TableCell>
                            <TableCell> Win-Rate </TableCell>
                            <TableCell> Load </TableCell>
                            <TableCell> Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>    {/* 6. 결과  */}
                        {this.state.records.map(record =>
                            <TableRow key={record.name}>
                                <TableCell component="th" scope="record"> {record.name} </TableCell>
                                <TableCell> {record.win} </TableCell>
                                <TableCell> {record.lose} </TableCell>
                                <TableCell> {record.draw} </TableCell>
                                <TableCell> {record.winrate}% </TableCell>
                                <TableCell onClick={() => this.editRecord(record.name)}>
                                    이어하기
                                </TableCell>
                                <TableCell onClick={() => this.deleteRecord(record.name)}>
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
                
            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default UserRecordComponent;