import axios from 'axios';   // npm install -f axios@^1.3.5

// - ApiService는 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 스프링부트는 톰캣이 실행되어 있어야 한다.
// - 리액트에서 무언가 요청을 하면 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해서 axios를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// npm install -f axios@^1.3.5     - import axios from 'axios';    - package.json에 추가됨 "axios": "^1.3.5",

const Record_API_BASE_URL = "http://localhost:8081/record";

class ApiService {

    // list
    fetchRecords() {  // 3.
        console.log('fetchRecords() 호출!!');
        return axios.get(Record_API_BASE_URL); // 스프링부트와 통신
    }

    // insert
    addRecord(inputData) {
        console.log('addRecord() 호출!!');
        return axios.post(Record_API_BASE_URL, inputData); // 스프링부트와 통신
    }

    // 1건 select
    fetchRecordById(name) {
        console.log('fetchRecordById() 호출!!');
        return axios.get(Record_API_BASE_URL + "/" + name)
    }

    // update
    editRecord(inputData) {
        console.log('editRecord() 호출!!');
        return axios.put(Record_API_BASE_URL + "/" + inputData.name, inputData)
    }

    // delete
    deleteRecord(name) {
        console.log('deleteRecord() 호출!!');
        return axios.delete(Record_API_BASE_URL + "/" + name)
    }
}

export default new ApiService;

