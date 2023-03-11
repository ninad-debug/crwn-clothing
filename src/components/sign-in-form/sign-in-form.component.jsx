import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';


import { signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword
} from '../../utils/Firebase';

import '../sign-in-form/sign-in-form.css';

const defaultFormFields = {
    email : '',
    password: '',
}

const SignInForm =()=>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async ()=>{
         await signInWithGooglePopup();
   }

    const handleSubmit = async(event) =>{
        event.preventDefault();

        try{
            const {user} = await signInAuthWithEmailAndPassword (email, password);
            resetFormFields();

        }catch(error){
            switch (error.code) {

                case 'auth/wrong-password':
                    alert('Incorrect Password for Email');
                    break;

                    case 'auth/user-not-found':
                        alert('No User associated with this email');
                        break;
            
                default:
                    console.log(error);
            }
        }
    }


    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                label="Email" 
                type='email' 
                required 
                onChange={handleChange} 
                name="email" 
                value={email} />

                <FormInput 
                label="Password" 
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password} />

                <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button 
                    buttonType={BUTTON_TYPE_CLASSES.google} 
                    type='button' 
                    onClick={signInWithGoogle}
                >
                    Google Sign In
                </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;