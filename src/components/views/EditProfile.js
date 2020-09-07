import React, {useState} from 'react'
import axios from 'axios'

import Form from '../layouts/Form'
import InputText from '../common/InputText'
import '../../theme/views.css'

const EditProfile = (props) =>{
    const initialState = {
            name: props.userInSession.name,
            surname: props.userInSession.surname,
            occupation: props.userInSession.occupation,
            age: props.userInSession.age,
            description: props.userInSession.description,
            emailValid: true,
            email: props.userInSession.email,
            socials: {
                facebook: props.userInSession.socials.facebook,
                twitter: props.userInSession.socials.twitter,
                instagram: props.userInSession.socials.instagram,
            },
            characteristics:props.userInSession.characteristics,
            imageUrl: props.userInSession.imageUrl,
            char: '',
            file: null
    }
    
    const [userEdit, setUserEdit] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const updateData = new FormData ()
        if(userEdit.file === null){
            updateData.append("imageUrl", userEdit.imageUrl)
        } else (
            updateData.append("imageUrl", userEdit.file)
        )
        
        updateData.append("name", userEdit.name)
        updateData.append("surname", userEdit.surname)
        updateData.append("occupation", userEdit.occupation)
        updateData.append("age", userEdit.age)
        updateData.append("description", userEdit.description)
        updateData.append("email", userEdit.email)
        updateData.append("socials", JSON.stringify(userEdit.socials))
        updateData.append("characteristics", JSON.stringify(userEdit.characteristics))

        axios.put(`http://localhost:5000/userprofile/${props.match.params.id}`, updateData, {withCredentials:true})
            .then((response) => {
                props.setUserSession(response.data)
                props.history.push(`/userprofile/${props.match.params.id}`)
            }).catch(err => setUserEdit(userEdit => ({
                ...userEdit,
                errorMessage: err.response.data.message
            })))
    }

    const handleChangeObject = ({target}) => {
        setUserEdit(userEdit => ({
            ...userEdit,
            socials : {
                ...userEdit.socials,
                [target.name]:target.value
            }
        }))
    }

    const handleChange = ({target}) => {
        setUserEdit(userEdit => ({
            ...userEdit,
            [target.name]: target.value
        }))
    }

    const handleFileUpload = ({target}) => {
        setUserEdit(userEdit => ({
            ...userEdit,
            file: target.files[0]
        }))
        
    }
    
    const deleteChar = (char) =>{
        const charArray = userEdit.characteristics
        charArray.splice((charArray.indexOf(char)),1)
        setUserEdit(userEdit => ({
            ...userEdit,
            characteristics: charArray
        }))
    }

    const handleCharPush = (e) => {
        const charArray = userEdit.characteristics;
        charArray.push(userEdit.char)
        setUserEdit(userEdit => ({
            ...userEdit,
            characteristics: charArray,
            char:''
        }))
    }

    const showChar = userEdit.characteristics.map(char => <li key={char} className="char-list"><button onClick={() => deleteChar(char)}>{char}</button></li>)

    if(props.userInSession._id === props.match.params.id){
        return (
            <Form   title="Edit profile"
                    subtitle="You can change your data here!"
                    image="/images/signup-2.png"
                    content={(
                        <form className="edit-form" onSubmit={handleSubmit}>
                            <label>User profile image (1MB max)</label>
                            <InputText
                                type="file"
                                name="imageUrl"
                                onChange={e => handleFileUpload(e)}
                            />
                            <label>Name</label>
                            <InputText
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={userEdit.name}
                                onChange={e => handleChange(e)}
                            />
                            <label>Surname</label>
                            <InputText
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={userEdit.surname}
                                onChange={e => handleChange(e)}
                            />
                            <label>Occupation</label>
                            <InputText
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                value={userEdit.occupation}
                                onChange={e => handleChange(e)}
                            />
                            <label>Email</label>
                            <InputText
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userEdit.email}
                                onChange={e => handleChange(e)}
                            />
                            <label>Age</label>
                            <InputText
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={userEdit.age}
                                onChange={e => handleChange(e)}
                            />
                            <label>Description</label>
                            <textarea   name="description"
                                        placeholder="Description"
                                        rows="7"
                                        value={userEdit.description}
                                        onChange={e => handleChange(e)}
                                        className="input-big"
                            ></textarea>
                            
                            <label>Characteristics</label>
                            <div className="char-form">
                                <InputText  type="text"  
                                            name="char"
                                            placeholder="Charactetistic"
                                            value={userEdit.char}
                                            onChange={e => handleChange(e)}
                                />
                                <input type="button" onClick={(e) => handleCharPush(e)} value="+" className="char-submit"/>
                            </div>                           
                            
                            <ul className="edit-char">
                                {showChar}
                            </ul>

                            <label>Socials</label>
                            <InputText
                                type="text"
                                name="facebook"
                                placeholder="Facebook"
                                value={userEdit.socials.facebook}
                                onChange={e => handleChangeObject(e)}
                            />
                            <InputText 
                                type="text"
                                name="twitter"
                                placeholder="Twitter"
                                value={userEdit.socials.twitter}
                                onChange={e => handleChangeObject(e)}
                            />
                            <InputText 
                                type="text"
                                name="instagram"
                                placeholder="Instagram"
                                value={userEdit.socials.instagram}
                                onChange={e => handleChangeObject(e)}
                            />
                            {userEdit.errorMessage ? <h6 className="error">Error: {userEdit.errorMessage} </h6> : null}
                            <input className="edit-submit" type="submit" value="Save changes"/>
                        </form>
                    )}
            />
        )
    } else {
        return(<h1>No user logged in</h1>)
    }
}

export default EditProfile
