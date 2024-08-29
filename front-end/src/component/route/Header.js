import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <div>

        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
        />

        {/* expand="lg": 네비게이션 바가 'lg' (large) 뷰포트 크기 이상에서는 확장되어 전체 메뉴가 보이도록 하고, 그 이하의 크기에서는 햄버거 메뉴로 축소됩니다. */}
        {/* fluid: 네비게이션 바의 컨텐츠가 전체 너비를 차지하게 합니다. */}
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            {/* <Navbar.Toggle>: 작은 화면 크기에서 네비게이션 바를 토글(열고 닫을 수 있는 햄버거 메뉴)할 수 있도록 하는 버튼입니다. */}
            {/* aria-controls="navbarScroll": 접근성을 위한 속성으로, 이 토글 버튼이 어떤 요소를 제어하는지 명시합니다 */}
            <Navbar.Toggle aria-controls="navbarScroll" />
            {/* <Navbar.Collapse>: 토글 버튼으로 네비게이션 메뉴를 열고 닫을 수 있는 영역입니다.  */}
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/record">Home</Nav.Link>
                <Nav.Link href="/record">userRecord</Nav.Link>
            </Nav>
            
            </Navbar.Collapse>
        </Container>
        </Navbar>

    </div>
  );
}

export default NavScrollExample;