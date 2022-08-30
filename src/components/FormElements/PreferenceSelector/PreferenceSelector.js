import React from 'react';
import "./PreferenceSelector.css";

const PreferenceSelector = ({ register }) => {
    return (
        <span className="preference_selector">
            <h4>Voorkeur voor lesvorm?</h4>
                <label htmlFor="live">
                    <input
                        type="radio"
                        id="live"
                        {...register("preferenceForLessonType")}
                        value="Live Lessen"
                    />
                    Live les
                </label>
                <label htmlFor="online">
                    <input
                        type="radio"
                        id="online"
                        {...register("preferenceForLessonType")}
                        value="Online Lessen"
                    />
                    Online les
                </label>
                <label htmlFor="both">
                    <input
                        type="radio"
                        id="both"
                        {...register("preferenceForLessonType")}
                        value="Geen voorkeur"
                    />
                    Geen voorkeur
                </label>
            </span>
    );
};

export default PreferenceSelector;