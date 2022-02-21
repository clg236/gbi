import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: row;
`

const Search = styled.div`
    font-size: max(16px, 2em);
    text-align: center;
    color: black;
`

const Button = styled.input`
    font-size: max(16px, 2em);
    text-align: center;
    background: hotpink;
    color: white;
    width: 300px;
    height: 2em;
`

const Input = styled.input`
    font-size: max(16px, 2em);
    padding: .25em .5em;
    margin: .25em;
    background-color: #fff;
    border: 5px solid black;
    border-radius: 20px;
`

const Table = styled.div`
    color: hotpink;
    padding: 5px;
`

const Row = styled.td`
    padding: 5px;
    color: hotpink;
    background-color: black;
`

export { 
    Wrapper,
    Search, 
    Button, 
    Input, 
    Table, 
    Row 
}
