
import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'


function ErrorMessage({Error,Message}) {

var classname= "error"

    if(Error===false)
    {
        classname= "success"
    }
    if(Message!=="")
    return(<p className={classname} >{Message}</p>)

    return (<></>)
}

const Form1=({array, setArray})=> {
    const [newName, setNewName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState("")

    return (

        <>  <ErrorMessage  Error={true} Message={error}></ErrorMessage>
            <form>
                <div>
                    name: <input onChange={(event) => setNewName(event.target.value)}/>
                </div>
                <div>
                    number: <input onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <div>
                    <button type="submit" onClick={(event) => {
                        event.preventDefault()
                        var phonebook = {}

                        phonebook.name = newName
                        phonebook.number = phone;
                        axios.post(`http://localhost:3001/api/person/`, phonebook).then(response => {
                        })
                            .catch(function (error) {
                                setError(error.response.data.error)
                            });
                        }}
                    >add
                    </button>
                    {
                        array.map(person => <p key={person.name}>{person.name} &nbsp; {person.number} &nbsp; <button onClick={()=>axios.delete(`http://localhost:3001/api/person/` +person.id)}>Delete</button></p>)
                    }
                </div>
            </form>
</>
        )}



const App = () => {
    const [array,setArray] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/all')
            .then(response => {
                console.log(response.data)
                var array1=[]
                response.data.forEach(person => {
                    var phonebook = {}
                    phonebook.id = person.id
                    phonebook.name = person.name
                    phonebook.number = person.number
                    array1.push(phonebook);

                    //Tarkistetaan, onko nimi jo luettelossa
                    if(array1.find((element) => element.name === person.name)===-1)  {
                        alert("moi")
                    }

                })
                setArray(array.concat(array1));
            })
    }, [])

if(array.length === 0){
    return (<div>Nothing found</div>)
}
    return (
        <div>
            <p>Phonebook </p>
            <Form1 array={array} setArray={setArray} />

        </div>
    )
}
export default App
