import React, { ChangeEvent, useEffect, useState } from 'react';
import { Affix, Card, Switch } from 'antd';
import './Feed.css';

const TAGS = ['League of Legends', 'Animal Crossing', 'C', 'D'];
const SORTING_TAGS = [
    'Ordre alphabétique croissant',
    'Ordre alphabétique décroissant',
    'Jeu',
    'Utilisateur',
];

function Feed() {
    const [filterState, setFilterState] = useState<Array<string>>([]);
    function onFilterButtonClick(event: ChangeEvent<HTMLInputElement>) {
        if (filterState.some((tag) => event.target.name === tag)) {
            setFilterState(filterState.filter((tag) => event.target.name !== tag));
        } else {
            setFilterState([...filterState, event.target.name]);
        }
    }

    function generateSampleCards(i: number) {
        const result: Array<JSX.Element> = [];
        for (let j = 0; j < i; j++) {
            result.push(
                <Card className="post" bordered={false}>
                    <h1>Toto</h1>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            );
        }
        return result;
    }

    return (
        <div className="Feed">
            <Affix className="filter">
                {TAGS.map((tag) => (
                    <div key={tag}>
                        <label htmlFor={tag}>{tag}</label>
                        <input
                            type="checkbox"
                            name={tag}
                            id={tag}
                            onChange={onFilterButtonClick}
                            checked={filterState.some((selectedTag) => tag === selectedTag)}
                        />
                        <br />
                    </div>
                ))}
                <p>{filterState}</p>
                <button onClick={() => setFilterState([])}>Reset</button>
            </Affix>
            <div id="posts">{generateSampleCards(20)}</div>
            <Affix className="sort">
                <Switch
                    checkedChildren="Croissant"
                    unCheckedChildren="Décroissant"
                    defaultChecked
                />
                {SORTING_TAGS.map((tag) => (
                    <div key={tag}>
                        <label htmlFor={tag}>{tag}</label>
                        <input
                            type="radio"
                            name="sort"
                            id={tag}
                            onChange={onFilterButtonClick}
                            checked={filterState.some((selectedTag) => tag === selectedTag)}
                        />
                        <br />
                    </div>
                ))}
            </Affix>
        </div>
    );
}

export default Feed;