import React from 'react';
import './InstrumentSelector.css'

const InstrumentSelector = ({ register, inputName, validationRules }) => {
    return (
        <select className="selector"
                id={inputName}
                {...register(inputName, validationRules)}
        >
            <option value="Gitaar">Gitaar</option>
            <option value="Basgitaar">Basgitaar</option>
            <option value="Piano">Piano</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Zang">Zang</option>
            <option value="Drum">Drum</option>
        </select>
    );
};

export default InstrumentSelector;