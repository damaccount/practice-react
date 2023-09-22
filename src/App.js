import logo from './logo.svg';
import './App.css';
import {click} from "@testing-library/user-event/dist/click";
import {useState} from "react";


function Article(props){
    return <article>
        <h2>{props.title}</h2>
        {props.body}
    </article>
}
function Header(props){
    console.log('props', props, props.title); //설명. 생략가눙
    return <header>
        <h1><a href="/" onClick={event=>{
            event.preventDefault(); // 클릭해도 reload 안됨
            props.onChangeMode();
        }}>{props.title}</a></h1>
    </header>
}
function Nav(props){
    const lis = []
    for(let i=0; i<props.topics.length; i++){
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} href={'/read' + t.id} onClick={event=>{
                event.preventDefault(); // 클릭해도 reload 안됨
                props.onChangeMode(Number(event.target.id)); //a태그 안에 문자 event.target.id를 숫자로
            }}>{t.title}</a>
        </li>)
    }
    return <nav>
        <ol>
            {lis}
        </ol>
    </nav>
}
function Create(props){
    return <article>
        <h2>Create</h2>
        <form onSubmit={event => {
            event.preventDefault(); //sumbit 버튼 눌렀을때 reload되지않게
            const title = event.target.title.value;
            const body = event.target.body.value;
            props.onCreate(title,body);
        }}>
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><textarea name="body" placeholder="body"/></p>
            <p><input type="submit" value="Create"/></p>
        </form>
    </article>
}
function App() {
    // const _mode = useState('WELCOME');
    // const mode = _mode[0]; //mode값을 통해 상태값 읽음 "WELCOME"
    // const setMode = _mode[1]; //1번째 원소인 setMode를 통해 mode값을 변경할때 사용하는 함수 f()
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const topics = [
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'javascript', body:'javascript is ...'}
    ]
    let content = null;
    if(mode === 'WELCOME'){
        content = <Article title="Welcome" body="Hello, WEB"></Article>
    }else if (mode === 'READ'){
        let title, body = null;
        for (let i=0; i<topics.length; i++){
            if(topics[i].id === id){
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    }else if (mode === 'CREATE'){
        content = <Create onCreate={(title, body) => {

        }}></Create>
    }
  return (
    <div>
        <Header title="WEB" onChangeMode={()=>{
            setMode('WELCOME');
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
            setMode('READ');
            setId(_id)
        }}></Nav>
        {content}
        <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
        }}>Create</a>
    </div>
  );
}

export default App;
