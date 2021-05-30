import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { CheckboxComponent } from './CheckboxComponent'

export const Interface = () => {

    const inputRef = useRef();

    const [isShowed, setisShowed] = useState(false);

    const [inputValue, setinputValue] = useState('');

    const [isChecked, setisChecked] = useState(false);

    const [strings, setStrings] = useState([]);

    const [filteredStrings, setfilteredStrings] = useState([]);

    useEffect( () => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json');
        setStrings(response.data.data)
    }

    const filterByLength = () => {
        if(inputValue === ''){
            setisShowed(true);
        } else {
            const filtered = strings.filter(string => {
                return string.length > Number(inputValue)
            });
            setfilteredStrings(filtered);
        }
    }

    const filterByString = () => {
        if(inputValue === ''){
            setisShowed(true);
        } else {
            if(isChecked){
                const filtered = strings.filter(string => {
                    return string.includes(inputValue);
                });
                setfilteredStrings(filtered);
            } else{
                const filtered = strings.filter(string => {
                    return string.toLowerCase().includes(inputValue.toLowerCase().trim()) || string.toUpperCase().includes(inputValue.toUpperCase().trim());
                });
                setfilteredStrings(filtered);
            }
        }
    }

    const changeCheckbox = () => {
        setisChecked(!isChecked);
    }

    return (
        <div className="container">
            <div className="interface">
                <div className="interface__inner">
                <div className="interface__row">
                    <input type="text" className="search" onChange={(e) => {
                        if(inputRef.current.value.trim()){
                            setisShowed(false);
                        }
                        setinputValue(e.target.value.trim());
                    }} ref={inputRef}/>
                    <p style={{display: isShowed ? 'block' : 'none'}} className="text">Введите что-нибудь в поле</p>
                </div>
                <div className="interface__row buttons">
                    <button onClick={filterByLength}>Фильтровать по длине</button>
                    <button onClick={filterByString}>Фильтровать по подстроке</button>
                </div>
                <CheckboxComponent changeCheckbox={changeCheckbox}/>
                <div className="interface__data">
                    <span className="interface__title">Отфильтрованные строки:</span>
                    <ul className="interface__strings">
                        {
                            filteredStrings.map(string => {
                                return (
                                    <li key={string}>{string}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                </div>
            </div>
        </div>
        
    )
}
