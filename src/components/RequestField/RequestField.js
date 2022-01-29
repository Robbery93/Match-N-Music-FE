import React, {useState} from 'react';
import './RequestField.css'

const RequestField = () => {

    // states
    const [request, setRequest] = useState("");

    return (
        <div className="field">
            <div className="request_background">

                <div className="request_left">
                    <h2>Je verzoek:</h2>
                    <div className="instrument">
                        <label htmlFor="instrument"><h3 className="select_h3">Instrument:</h3></label>
                        <select name="instrument" id="instrument" placeholder="Kies een instrument">
                            <option value="gitaar">Gitaar</option>
                            <option value="basgitaar">Basgitaar</option>
                            <option value="piano">Piano</option>
                            <option value="keyboard">Keyboard</option>
                            <option value="zang">Zang</option>
                            <option value="drum">Drum</option>
                            <option value="anders">Anders</option>
                        </select>
                    </div>

                    <div className="request">
                        <label htmlFor="request"><h3>Wat wil je leren?</h3></label>
                        <textarea
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            placeholder="Wees zo duidelijk mogelijk!"
                        >
                        </textarea>
                    </div>
                </div>

                <div className="request_right">
                    <div className="preference">
                        <h3>Hoe wil je les krijgen?</h3>
                        <div className="checkbox_container">
                            <label htmlFor="live"><input type="checkbox" id="live" name="preference" value="Live les" />Live les</label>
                        </div>
                        <label htmlFor="online">
                            <input type="checkbox" id="online" name="preference" value="Online les" />
                            Online les
                        </label>
                    </div>

                    <div className="availability">
                        <h3>Op welke dagen ben je beschikbaar?</h3>
                        <ul>
                            <li>
                        <input className="day" type="checkbox" id="ma" name="availability" value="Ma" />
                        <label htmlFor="ma">Ma</label>
                            </li>
                            <li>
                        <input className="day" type="checkbox" id="di" name="availability" value="Di" />
                        <label htmlFor="di">Di</label>
                        </li>
                        <li>
                        <input className="day" type="checkbox" id="wo" name="availability" value="Wo" />
                        <label htmlFor="wo">Wo</label>
                        </li>
                            <li>
                        <input className="day" type="checkbox" id="do" name="availability" value="Do" />
                        <label htmlFor="do">Do</label>
                            </li>
                            <li>
                        <input className="day" type="checkbox" id="vr" name="availability" value="Vr" />
                        <label htmlFor="vr">Vr</label>
                            </li>
                            <li>
                        <input className="day" type="checkbox" id="za" name="availability" value="Za" />
                        <label htmlFor="za">Za</label>
                            </li>
                            <li>
                        <input className="day" type="checkbox" id="zo" name="availability" value="Zo" />
                        <label htmlFor="zo">Zo</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestField;