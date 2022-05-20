import React from 'react';
import './InstrumentSelector.css'

const InstrumentSelector = ( {labelId, register, inputName, validationRules} ) => {
    return (
        <select className="selector"
                id={labelId}
                {...register(inputName, validationRules)}
        >
            <option value="guitar">Gitaar</option>
            <option value="bassguitar">Basgitaar</option>
            <option value="piano">Piano</option>
            <option value="keyboard">Keyboard</option>
            <option value="singing">Zang</option>
            <option value="drums">Drum</option>
            <option value="other">Anders</option>
        </select>
    );
};

export default InstrumentSelector;