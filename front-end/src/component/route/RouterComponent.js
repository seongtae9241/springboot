import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';  // npm install react-router@5 react-router-dom@5
import RockPaperScissorsComponent from '../game/RockPaperScissors'
import UserRecordComponent from '../game/UserRecordComponent';

const RouterComponent = () => {
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/" exact={true} component={RockPaperScissorsComponent} />
                    <Route path="/record" exact={true} component={UserRecordComponent} />
                    <Route path="/game" exact={true} component={RockPaperScissorsComponent} />
                </div>
            </BrowserRouter>
        </div>
        //<BrowserRouter> 안에 정의된 <Route> 컴포넌트들을 사용하여, 특정 URL 경로와 해당 경로에 매핑되는 컴포넌트를 설정
    )
};

const style = {
    margin : '10px'
}

export default RouterComponent;